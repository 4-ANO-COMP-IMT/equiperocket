import amqp from 'amqplib';

async function publishEvent(queue,msg){
    try {
        const conn = await amqp.connect('amqp://rabbitmq-service:5672');
        const channel = await conn.createChannel();
        await channel.assertQueue(queue, 
            {durable: false});
        let data = JSON.stringify(msg);
        channel.sendToQueue(queue, Buffer.from(data));
        console.log(' [x] Sent %s', data);
        setTimeout(() => {
            conn.close();
        }, 1000);
    } catch (error) {
        console.error("Erro ao enviar mensagem para a fila",error);
    }
}

export  {publishEvent};