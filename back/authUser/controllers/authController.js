const User = require( '../entities/user.js');
const {signIn} = require('../usecases/user/signIn.js');
const {generateToken} = require("../utils/tokenUtils.js");
const {userProfile} = require("../usecases/user/userProfile.js");
const amqp = require("amqplib");
const {addUser} = require("../models/userModel.js");

let user = new User();

async function authUser(req, res){
    try {
        const { email, password } = req.body;
        user.email = email;
        user.password = password;
        let success = await signIn(user);
        if (success === true){
            const token = generateToken(user);
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

amqp.connect("amqp://localhost", async (error0, connection) => {
    if (error0) {
        throw error0;
    }
    await connection.createChannel(async(error1, channel) => {
        if (error1) {
            throw error1;
        }
        const queue = "user_signup";
        await channel.assertQueue(queue, {
            durable: false
        });
       await channel.consume(queue, (msg) => {
            if (msg.content) {
                const user = JSON.parse(msg.content.toString());
                addUser(user);
                console.log(" [x] Received %s", user.email);
            }
         
        }, {
            noAck: true
        });
    });
});

module.exports = {
    authUser,
    getUser
};