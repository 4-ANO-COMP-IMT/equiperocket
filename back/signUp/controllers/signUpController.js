import User from  '../entities/user.js';
import {signUp} from '../usecases/signUp.js';

async function postUser(req, res){
    try {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        let user = new User(email, password,name);
        const status = await signUp(user);
        if (status === true){
            res.status(201);
            return res.send("Usuário criado!");
        }else{
            res.status(400);
            return res.send("Usuário já existe!");
        }
    } catch (error) {
       res.status(500);
       return res.send(error.message);    
    }
}
export default {postUser};