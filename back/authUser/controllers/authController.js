const User = require( '../entities/user.js');
const {signIn} = require('../usecases/user/signIn.js');
const {generateToken} = require("../utils/tokenUtils.js");

const {subscribeToEvent} = require("../common/subscriber.js");
const {publishEvent} = require("../common/publisher.js");

// async function initSubscriber(){
//     subscribeToEvent('response.user', (message) => {
//         console.log('User created event received:', message);
        
//     });
// }

// initSubscriber();


async function authUser(req, res){
    try {
        const { email, password } = req.body;
        let user = new User();
        user.email = email;
        user.password = password;

        let authResponse = await signIn(user);
        if (authResponse){
            const { data, userType } = authResponse;
            const cpfCnpj = data.CPF || data.CNPJ;
            const token = generateToken({ email,password ,cpfCnpj, userType });
            await publishEvent("auth.status", 
                JSON.stringify({ email, token, userType: user.userType }));
            return res.status(200).json({ token, message: "Usuário logado!" });
        } else {
            await publishEvent("auth.status", 
                JSON.stringify({ email, token: null }));
            return res.status(400).send("Usuário ou senha incorretos!");
        }
        
    } catch (error) {
        res.status(500);
        return res.send(error.message);
    
    }
}



module.exports = {
    authUser
};