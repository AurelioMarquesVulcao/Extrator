/** @format */

const amqp = require('amqplib')
const sleep = require('await-sleep')

const queue = 'hello7'
const text = '222Lorem Ipsum is simply '
;(async () => {
  let connection
  try {
    connection = await amqp.connect('amqp://user:password@localhost:5672')
    const channel = await connection.createChannel()

    await channel.assertQueue(queue, { durable: true })

    // NB: `sentToQueue` and `publish` both return a boolean
    // indicating whether it's OK to send again straight away, or
    // (when `false`) that you should wait for the event `'drain'`
    // to fire before writing again. We're just doing the one write,
    // so we'll ignore it.
    channel.sendToQueue(queue, Buffer.from(text))
    channel.sendToQueue(queue, Buffer.from(text))
    channel.sendToQueue(queue, Buffer.from(text))
    channel.sendToQueue(queue, Buffer.from(text))
    channel.sendToQueue(queue, Buffer.from(text))
    channel.sendToQueue(queue, Buffer.from(text))
    channel.sendToQueue(queue, Buffer.from(text))
    channel.sendToQueue(queue, Buffer.from(text))
    channel.sendToQueue(queue, Buffer.from(text))
    channel.sendToQueue(queue, Buffer.from(text))
    channel.sendToQueue(queue, Buffer.from(text))
    channel.sendToQueue(queue, Buffer.from(text))
    channel.sendToQueue(queue, Buffer.from(text))
    channel.sendToQueue(queue, Buffer.from(text))
    channel.sendToQueue(queue, Buffer.from(text))
    channel.sendToQueue(queue, Buffer.from(text))
    channel.sendToQueue(queue, Buffer.from(text))
    channel.sendToQueue(queue, Buffer.from(text))
    channel.sendToQueue(queue, Buffer.from(text))
    channel.sendToQueue(queue, Buffer.from(text))
    console.log(" [x] Sent '%s'", text)
    // await sleep(5000)
    await channel.close()
  } catch (err) {
    console.warn(err)
  } finally {
    if (connection) await connection.close()
  }
})()

// #!/usr/bin/env node

// const amqp = require('amqplib');

// const queue = 'hello';

// ;(async () => {
//   try {
//     const connection = await amqp.connect('amqp://user:password@localhost:5672')
//     const channel = await connection.createChannel()

//     process.once('SIGINT', async () => {
//       await channel.close()
//       await connection.close()
//     })

//     await channel.assertQueue(queue, { durable: false })
//     await channel.consume(
//       queue,
//       async message => {
//         await sleep(5000)
//         // const error = new Error('Não foi possivél processar')
//         // throw error
//         console.log(" [x] Received '%s'", message.content.toString())
//       },
//       { noAck: true }
//     )

//     console.log(' [*] Waiting for messages. To exit press CTRL+C')
//   } catch (err) {
//     console.log(err)
//     console.warn(err)
//   }
// })
;(async () => {
  try {
    const connection = await amqp.connect('amqp://user:password@localhost:5672')
    process.once('SIGINT', async () => {
      await connection.close()
    })

    const channel = await connection.createChannel()
    await channel.assertQueue(queue, { durable: true })

    channel.prefetch(3)
    await channel.consume(
      queue,
      async message => {
        const text = message.content.toString()
        console.log(" [x] Received '%s'", text)
        const seconds = text.split('.').length - 1
        await sleep(5000)
        setTimeout(() => {
          console.log(' [x] Done')
          channel.ack(message)
        }, seconds * 1000)
      },
      { noAck: false }
    )

    console.log(' [*] Waiting for messages. To exit press CTRL+C')
  } catch (err) {
    console.warn(err)
  }
})()
