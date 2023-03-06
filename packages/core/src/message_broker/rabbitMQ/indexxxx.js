/** @format */

const amqp = require('amqplib')
const sleep = require('await-sleep')

const queue = 'hello7'
const text = JSON.stringify({ chave: '222Lorem Ipsum is simply ', outraChave: '222Lorem Ipsum is simply ' })

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

    console.log(" [x] Sent '%s'", text)
    // await sleep(5000)
    await channel.close()
  } catch (err) {
    console.warn(err)
  } finally {
    if (connection) await connection.close()
  }
})

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
const consume = async (...args) => {
  try {
    const connection = await amqp.connect('amqp://user:password@localhost:5672')
    process.once('SIGINT', async () => {
      await connection.close()
    })

    const channel = await connection.createChannel()
    await channel.assertQueue(queue, { durable: true })

    channel.prefetch(1)
    await channel.consume(
      queue,
      async message => {
        const text = JSON.parse(message.content.toString())
        // console.log(" [x] Received '%s'", text)
        // const seconds = text.split('.').length - 1
        await sleep(5000)
        setTimeout(() => {
          args.forEach(async arg => {
            arg(text)
          })

          console.log(' [x] Done')
          // const error = new Error('Não foi possivél processar')
          // throw error
          channel.ack(message)
        }, 1000)
      },
      { noAck: false }
    )

    console.log(' [*] Waiting for messages. To exit press CTRL+C')
  } catch (err) {
    console.log(err)
    console.warn(err)
  }
}

const hello = mensage => {
  console.log('hello world')
  console.log(mensage)
}
// consume(hello)


// docker run -d --hostname my-rabbit -p 5672:5672 -p 15672:15672 --name some-rabbit -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=password --restart=unless-stopped rabbitmq:3-management