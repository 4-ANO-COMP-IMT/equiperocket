import { connect } from 'amqplib';

async function subscribeToEvent(queue,callback){
    try{
        const conn = await connect('amqp://localhost');
        const channel = await conn.createChannel();
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

export  {subscribeToEvent};