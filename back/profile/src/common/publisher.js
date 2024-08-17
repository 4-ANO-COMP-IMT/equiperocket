import { connect } from 'amqplib';

async function publishEvent(queue,msg){
    try {
        const conn = await connect('amqp://localhost');
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