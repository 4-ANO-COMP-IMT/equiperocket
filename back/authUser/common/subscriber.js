const amqp = require('amqplib');

let channel;
let consumerTags = {};
async function getConnection() {
    if (!channel) {
        const conn = await amqp.connect('amqp://localhost');
        conn.on('error', (err) => {
            console.error('Erro de conexão:', err.message);
            channel = null; 
        });
        channel = await conn.createChannel();
    }
    return channel;
}

async function subscribeToEvent(queue, callback) {
    try {
        const channel = await getConnection();
        await channel.assertQueue(queue, { durable: false });
        console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);
        const {consumerTag} = await channel.consume(queue, (msg) => {
            try {
                const msgContent = JSON.parse(msg.content.toString());
                console.log(" [x] Received %s", msg.content.toString());
                callback(msgContent);
                channel.ack(msg); 
            } catch (error) {
                console.error("Erro ao processar a mensagem:", error.message);
                
            }
        });

        consumerTags[queue] = consumerTag;

    } catch (error) {
        console.error("Erro ao assinar o evento na fila", error);
    }
}

async function purgeQueue(queue) {
    try {
        const channel = await getConnection();
        await channel.purgeQueue(queue);
        console.log(queue + " purged"); 
    } catch (error) {
        console.error("Erro ao limpar a fila", error);
    }
}

async function unsubscribeFromEvent(queue) {
    try {
        const channel = await getConnection();
        const consumerTag = consumerTags[queue];
        if(consumerTag){
            await channel.cancel(consumerTag);
            console.log(`[x] Unsubscribed from ${queue}`);
            delete consumerTags[queue]; //Remove tag dps de desinscrever
        }else {
            console.error(`Nenhuma assinatura ativa encontrada para a fila ${queue}`);
        }
    } catch (error) {
        console.error("Erro ao se desincrever da fila: ", error);
    }
}

module.exports = { subscribeToEvent, purgeQueue, unsubscribeFromEvent };
