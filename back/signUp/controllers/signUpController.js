const { signUp } = require('../usecases/signUp.js');
const {publishEvent} = require('../common/publisher.js');
const {subscribeToEvent} = require('../common/subscriber.js');

async function initSubscriber(){
  
}

initSubscriber();

async function postUser(req, res){
    try {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name; 
        let user = {email:email, 
            password:password,
            name:name};
        const result = await signUp(user);
        if (result){
            await publishEvent('user.created', JSON.stringify(user));
            return res.send("Usuário criado!").status(201);
        }else{
            await publishEvent('user.exists', "Usuário já existe!");
            return res.send("Usuário já existe!").status(400);
        }
        
    } catch (error) {
      
       return res.status(500).send(error.message);    
    }
}


module.exports = {postUser};