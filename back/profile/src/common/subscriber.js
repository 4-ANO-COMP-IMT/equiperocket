import { connect } from 'amqplib';

let channel;
async function getConnection(){
    if(!channel){
        const conn = await amqp.connect('amqp://rabbitmq-service:5672');
        channel = await conn.createChannel();
    }
    return channel;
}

async function subscribeToEvent(queue,callback){
    try{
        const channel = await getConnection();
        await channel.assertQueue(queue, 
            {durable: false});
        console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);
        channel.consume(queue, (msg) => {
            const msgContent = JSON.parse(msg.content.toString());
            console.log(" [x] Received %s", msg.content.toString());
            callback(msgContent);
            channel.ack(msg);
        });
    }catch(error){
        console.error("Erro ao enviar mensagem para a fila",error);
    }
}
async function purgeQueue(queue){
    try{
        const channel = await getConnection();
        await channel.purgeQueue(queue);
        console.log(queue);
    }catch(error){
        console.error("Erro ao limpar a fila",error);
    }
}

export  {subscribeToEvent, purgeQueue};