const User = require('../entities/user.js');
const { signUp } = require('../usecases/signUp.js');
const {publishEvent} = require('../routes/publisher.js');
const {subscribeToEvent} = require('../routes/subscriber.js');

async function initSubscriber(){
    subscribeToEvent('user.exists', (message) => {
        console.log('User exists event received:', message);
    });
}

initSubscriber();

async function postUser(req, res){
    try {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        let user = new User(email, password,name);
        const status = await signUp(user);
        if (status === true){
            await publishEvent('user.created', JSON.stringify(user));
            return res.send("Usuário criado!").status(201);
        }else{
            await publishEvent('user.exists', JSON.stringify(user));
            return res.send("Usuário já existe!").status(400);
        }
        
    } catch (error) {
      
       return res.status(500).send(error.message);    
    }
}


module.exports = {postUser};