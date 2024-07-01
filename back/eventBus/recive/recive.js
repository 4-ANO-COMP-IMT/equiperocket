import amqp from "amqplib";


amqp.connect('amqp://localhost', async function(error0, connection) {
  console.log("connected");
  if (error0) {
      throw error0;
  }
  await connection.createChannel( async function(error1, channel) {
      if (error1) {
          throw error1;
      }
    let queue = "task_queue";


    await channel.assertQueue(queue, {
      durable: true,
    });

    await channel.consume(queue, (msg) => {
      let secs = msg.content.toString().split(".").length - 1;

      console.log(" [x] Received %s", msg.content.toString());
      setTimeout(() => {
        console.log(" [x] Done");
      }, secs * 1000);
    }, {
      noAck: true,
    });
    
    console.log(" [x] Sent '%s'", msg);

  });
});

const queue = "product_inventory";

(async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    process.once("SIGINT", async () => {
      await channel.close();
      await connection.close();
    });

    await channel.assertQueue(queue, { durable: false });
    await channel.consume(
      queue,
      (message) => {
        if (message) {
          console.log(
            " [x] Received '%s'",
            JSON.parse(message.content.toString())
          );
        }
      },
      { noAck: true }
    );

    console.log(" [*] Waiting for messages. To exit press CTRL+C");
  } catch (err) {
    console.warn(err);
  }
})();