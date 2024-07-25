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
}

initSubscriber();

const createProfile = async () => {
    try {
        const user = await createUser(profileData);
        if(user){
            publishEvent("created.user", user);
            
        }else{
        	
        }
        

    } catch (error) {
        
        return{ message: error.message };
    }
};

const updateProfile = async (req, res) => {
    const email = req.params.email;
    const updateData = req.body;
    try {
        const user = await setUser(email, updateData);
        publishEvent("updatedUser", user);
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