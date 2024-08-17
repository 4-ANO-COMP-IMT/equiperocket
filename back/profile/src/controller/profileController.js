import { publishEvent } from "../common/publisher.js";
import { subscribeToEvent } from "../common/subscriber.js";
import { setUser } from "../usecases/setUser.js";
import { getUser } from "../usecases/getUser.js";
import { createUser } from "../usecases/createUser.js";    



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
}

initSubscriber();

const createProfile = async (profileData) => {
    //TODO: Implementar a lógica de adicionar o usuário no banco de dados
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
    try {
        const user = await getUser(email);
        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export  { updateProfile, getProfile };