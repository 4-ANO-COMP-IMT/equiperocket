import { publishEvent } from "../common/publisher.js";
import { subscribeToEvent, purgeQueue } from "../common/subscriber.js";
import { setUser } from "../usecases/setUser.js";
import { getUser } from "../usecases/getUser.js";
import { createUser } from "../usecases/createUser.js";    
import { verifyToken } from "../utils/tokenUtils.js";


async function initSubscriber(){
    subscribeToEvent('user.created', (message) => {
        console.log('User created event received:', message);
        createProfile(message);
    });
    subscribeToEvent('request.use', async (message) => {
        console.log('Request all users event received:', message);
        let user = await getUser(message.email);
        await publishEvent('response.user', JSON.stringify(user));
    });
    subscribeToEvent('auth.user', async (message) => {
        console.log('User auth event received:', message);
        let user = await getUser(message.email);
        await publishEvent('auth.res', JSON.stringify(user));
    });
}

initSubscriber();

const createProfile = async (profileData) => {
    try {
        const user = await createUser(profileData);
        publishEvent("created.user", user); 
    } catch (error) {
        console.error(`Erro ao criar perfil: ${error.message}`);
        return(`Erro ao criar perfil: ${error.message}`);
    }
};

const updateProfile = async (req, res) => {
    const email = req.params.email;
    const updateData = req.body;
    try {
        const user = await setUser(email, updateData);
        publishEvent("updated.User", user);
        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const getProfile = async (req, res) => {
    const email = req.params.email;
    const TIMEOUT_DURATION = 5000;

    try {
        // Enviar evento para verificar se o usuário está autenticado
        await publishEvent('check.auth', { email });

        const timeout = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Tempo de espera excedido.')), TIMEOUT_DURATION)
        );

        const response = await Promise.race([ 
            new Promise((resolve, reject) => {
                subscribeToEvent('auth.status', async (message) => {
                    try {
                        const { token } = message;
                        const verify = verifyToken(token);
                        if (verify) {
                            const user = await getUser(email);
                            resolve(user);
                        } else {
                            reject(new Error('Usuário não autenticado.'));
                        }
                    } catch (error) {
                        reject(error);
                    }
                });
            }), 
            timeout
        ]);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }finally{
        try {
            await purgeQueue('auth.status');
        } catch (error) {
            console.error('Erro ao limpar a fila:', error);
        }
    }
};

export  { updateProfile, getProfile };