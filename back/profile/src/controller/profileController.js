import { publishEvent } from "../common/publisher.js";
import { subscribeToEvent, purgeQueue } from "../common/subscriber.js";
import { setUser } from "../usecases/setUser.js";
import { getUser } from "../usecases/getUser.js";
import { createUser } from "../usecases/createUser.js";    
import { getProfile } from "../usecases/getProfile.js";

let userToken = {
    email: null,
    token: null
};

async function initSubscriber(){
    subscribeToEvent('user.created', (message) => {
        console.log('User created event received:', message);
        createProfile(message);
    });
    subscribeToEvent('restaurant.created', (message) => {
        console.log('Restaurant created event received:', message);
        createRestaurant(message);
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
    subscribeToEvent('auth.status', async (message) => {
        console.log('Auth status event received:', message);
        userToken = {
            email: message.email,
            token: message.token
        };
        return userToken;    
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

const createRestaurant = async (profileData) => {
    try {
        const user = await createEatery(profileData);
        publishEvent("created.restaurant", user); 
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

const getProfileData = async (req, res) => {
    const email = req.body.email;
    try {
        let profileData = await getProfile(email, userToken.token);
        if (profileData && profileData.email && profileData.name) {
            let response = {
                email: profileData.email,
                name: profileData.name,
                userType: profileData.userType
            };
            if(profileData.userType === 'user'){
                response = {
                    ...response,
                    cpf: profileData.cpf
                };
            };
            if(profileData.userType === 'restaurant'){
                response = {
                    ...response,
                    cnpj: profileData.cnpj
                };
            };
            return res.status(200).json(response);
        } else {
            return res.status(401).send({ message: 'Usuário não autenticado.' });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export  { updateProfile, getProfileData };