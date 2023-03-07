/** @format */

// import { TesteModel } from './databases/models/teste'
import { conectMongo, disconnectMongo, extractionSave, processingSave } from './databases/mongoDB'
import { downloadSoft } from './download'
import { Loggers } from './Logger'
// import { redisConfig } from './message_broker/config/redis'
// import Teste_de_fila from './message_broker/jobs/Teste_de_fila'
import { convertFolderToPDF } from './pdf'
import { testPrivate, testPublic } from './RSA/keys'
import { rsaDecryptSHA512 } from './RSA/RSA-decrypt'
import { rsaEncryptSHA512 } from './RSA/RSA-encrypt'
import { privateKey, publicKey } from './RSA/RSA-keys'
import Queue from '../src/message_broker/bull/lib/Queue'
import { fila } from './message_broker/bull'
// import { consumer, publish } from './message_broker/rabbitMQ'
// import { youtube } from './youtube'
// const { Robo } = require('./robo');

export const convertImageFolderPdf = convertFolderToPDF
export const downloadSoftUrl = downloadSoft
export const rsaDecrypt = rsaDecryptSHA512
export const rsaEncrypt = rsaEncryptSHA512
export const rsaPrivateKey4096 = privateKey
export const rsaPublicKey4096 = publicKey
export const Logger = Loggers
export { conectMongo, disconnectMongo, extractionSave, processingSave } from './databases/mongoDB'
export { Processing, Extracting } from './@types'
export { publish, consumer } from './message_broker/rabbitMQ'
export { downloadSoftMessage } from './download'
export const Queues = Queue

export const testCore = (name: string) => {
  console.log('olá mundo, me chamo: ' + name)
}
// testCore("jon Doe!")
;(async () => {
  // console.log(Teste_de_fila)
  // console.log(redisConfig);
  const user = { nome: '212', email: '2323' }
  // await publish('teste', [
  //   { nome: '212', email: '2323' },
  //   { nome: '212', email: '2323' },
  // ])
  // const hello = mensage => {
  //   console.log('hello world2')
  //   console.log(mensage)
  // }
  // await consumer('teste', 3, hello)
  // consumer('teste')
  // await youtube('https://www.youtube.com/watch?v=-wXPxJYhZeI',"pré-aula0")
  // console.log(Queue.queues.map(queue => queue.bull))

  // para filas individuais
  // await Queue.add({ user })
  // fila

  // await conectMongo();
  // let teste = {
  //   name: "Jon Doe",
  //   email: "jon.doe@gmail.com",
  //   password: "12345679",
  //   role: "admin",
  // };
  // await processingSave(teste);
  // await extractionSave("12345","123456", teste, "started");
  // let lorem = "Lorem ipsum dolor sit amet"
  // console.time("primeiro teste")
  // console.log(rsaDecryptSHA512(rsaEncryptSHA512(lorem, testPublic), testPrivate));
  // rsaDecryptSHA512(rsaEncryptSHA512(lorem, testPublic), testPrivate)
  // console.timeEnd("primeiro teste")
  // console.time("segunto teste")
  // console.log(rsaDecryptSHA512(rsaEncryptSHA512(lorem, publicKey), privateKey));
  // console.timeEnd("segunto teste")
  // await disconnectMongo();
})()

// let estrair = async () => {

//   let robo = new Robo();
//   let teste = await robo.acessar({
//     url: "https://www.google.com/",
//   })
// console.log(teste.responseBody);
// }
