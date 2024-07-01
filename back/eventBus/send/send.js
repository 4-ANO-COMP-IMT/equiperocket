import amqp from "amqplib";


amqp.connect('amqp://localhost', async function(error0, connection) {
  if (error0) {
      throw error0;
  }
  await connection.createChannel(async function(error1, channel) {
      if (error1) {
          throw error1;
      }
      let queue = "task_queue";
      let msg = process.argv.slice(2).join(" ") || "Hello World!";
      await channel.assertQueue(queue, {
        durable: true,
      });
     await channel.sendToQueue(queue, Buffer.from(msg), {  
        persistent: true,
      });
     await channel.close();

      console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() {
      connection.close();
      process.exit(0);
  }, 500);
});


const queue = "product_inventory";
const text = {
  id: "1",
  text: "This is a sample message to send receiver to check the ordered Item Availablility",
};

async function send(queue, text) {
  let connection;
  try {
    connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));
    console.log(" [x] Sent '%s'", text);
    await channel.close();
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
}

send(queue, text);