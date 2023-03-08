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
import { getPage } from './puppeteer'

// old export
export const convertImageFolderPdf = convertFolderToPDF
export const downloadSoftUrl = downloadSoft
export const rsaDecrypt = rsaDecryptSHA512
export const rsaEncrypt = rsaEncryptSHA512
export const rsaPrivateKey4096 = privateKey
export const rsaPublicKey4096 = publicKey
export const Logger = Loggers
export const Queues = Queue

// New export
export { conectMongo, disconnectMongo, extractionSave, processingSave } from './databases/mongoDB'
export { Processing, Extracting } from './@types'
export { publish, consumer } from './message_broker/rabbitMQ'
export { downloadSoftMessage } from './download'
export { getPage } from './puppeteer'

// test
export const testCore = (name: string) => {
  console.log('olá mundo, me chamo: ' + name)
}

// testador de novas implementações.
;(async () => {
  const user = { nome: '212', email: '2323' }
  await getPage('https://mangalivre.net/ler/super-god-pet-shop/online/433597/1#/!page0')

})()
