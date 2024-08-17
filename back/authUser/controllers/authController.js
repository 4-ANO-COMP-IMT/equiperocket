const User = require( '../entities/user.js');
const {signIn} = require('../usecases/user/signIn.js');
const {generateToken} = require("../utils/tokenUtils.js");
const {userProfile} = require("../usecases/user/userProfile.js");
const {subscribeToEvent} = require("../common/subscriber.js");
const {publishEvent} = require("../common/publisher.js");

async function initSubscriber(){
    subscribeToEvent('user.created', (message) => {
        console.log('User created event received:', message);
        // TODO: Implementar a lógica de adicionar o usuário no banco de dados
    });
}

initSubscriber();
let user = new User();

async function authUser(req, res){
    try {
        const { email, password } = req.body;
        user.email = email;
        user.password = password;
        let success = await signIn(user);
        if (success === true){
            const token = generateToken(user);
            await publishEvent("user_auth", JSON.stringify(user));
            return res.status(200).json({ token, message: "Usuário logado!" });
        } else {
            return res.status(400).send("Usuário ou senha incorretos!");
        }
        
    } catch (error) {
        res.status(500);
        return res.send(error.message);
    
    }
}


async function getUser(req,res){
    try {
        const user = req.user;
        const filteredUser = await userProfile(user);
        return res.status(201).json(filteredUser);
    } catch (error) {
        res.status(500);
        return res.send(error.message);
    }
}


module.exports = {
    authUser,
    getUser
};