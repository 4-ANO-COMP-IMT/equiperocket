const amqp = require('amqplib');

async function publishEvent(queue,msg){
    try {
        const conn = await amqp.connect('amqp://rabbitmq-service:5672');
        const channel = await conn.createChannel();
        await channel.assertQueue(queue, 
            {durable: false});
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(' [x] Sent %s', msg);
        setTimeout(() => {
            conn.close();
        }, 1000);
    } catch (error) {
        console.error("Erro ao enviar mensagem para a fila",error);
    }
}

module.exports = {publishEvent};