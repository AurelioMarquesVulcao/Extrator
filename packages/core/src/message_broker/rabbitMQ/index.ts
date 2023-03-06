/** @format */

import amqp from 'amqplib'

import dotenv from 'dotenv'
import sleep from 'await-sleep'

dotenv.config()
const rabbit = process.env.RABBITMQ_URL || 'amqp://user:password@127.0.0.1:5672'
console.log(rabbit);

export const publish = async (queue: string, messages: Array<object>) => {
  let connection
  try {
    console.log(rabbit);

    connection = await amqp.connect(rabbit)
    const channel = await connection.createChannel()

    await channel.assertQueue(queue, { durable: true })
    messages.forEach(async message => {
      console.log(JSON.stringify(message));

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
    })


    await sleep(300)
    await channel.close()
  } catch (err) {
    console.log(err);

    console.warn(err)
  } finally {
    if (connection) await connection.close()
  }
}


export const consumer = async (queue: string, listeners: number, ...args: Array<Function>) => {
  try {
    const connection = await amqp.connect(rabbit)
    process.once('SIGINT', async () => {
      await connection.close()
    })

    const channel = await connection.createChannel()
    await channel.assertQueue(queue, { durable: true })

    channel.prefetch(listeners)
    await channel.consume(
      queue,
      async message => {
        const text = message.content.toString()

        await sleep(250)
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
