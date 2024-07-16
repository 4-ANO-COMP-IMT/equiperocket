const User = require('../entities/user.js');
const { signUp } = require('../usecases/signUp.js');
const amqp = require('amqplib');

async function postUser(req, res){
    try {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        let user = new User(email, password,name);
        const status = await signUp(user);
        if (status === true){
            await sendToQueue(user);
            return res.send("Usuário criado!").status(201);
        }else{
            return res.send("Usuário já existe!").status(400);
        }
    } catch (error) {
      
       return res.status(500).send(error.message);    
    }
}

async function sendToQueue(user){
    try {
        const conn = await amqp.connect('amqp://localhost');
        const channel = await conn.createChannel();
        const queue = 'user_signup';

        await channel.assertQueue(queue, 
            {durable: false});
        const msg = JSON.stringify(user);

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(' [x] Sent %s', msg);

        setTimeout(() => {
            conn.close();
        }, 1000);

    } catch (error) {
        console.error("Erro ao enviar mensagem para a fila",error);
    }
}
module.exports = {postUser};