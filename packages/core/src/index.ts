import { conectMongo, disconnectMongo } from "./databases/mongoDB";
import { downloadSoft } from "./download";
import { convertFolderToPDF } from "./pdf"
import { testPrivate, testPublic } from "./RSA/keys";
import { rsaDecryptSHA512 } from "./RSA/RSA-decrypt";
import { rsaEncryptSHA512 } from "./RSA/RSA-encrypt";
import { privateKey, publicKey } from "./RSA/RSA-keys";
const { Robo } = require('./robo');



export const convertImageFolderPdf = convertFolderToPDF
export const downloadSoftUrl = downloadSoft
export const rsaDecrypt = rsaDecryptSHA512
export const rsaEncrypt = rsaEncryptSHA512
export const rsaPrivateKey4096 = privateKey
export const rsaPublicKey4096 = publicKey

export const testCore = (name: string) => {
  console.log("olá mundo, me chamo: " + name);
}
// testCore("jon Doe!")
(async()=>{
  await conectMongo()
  let lorem = "Lorem ipsum dolor sit amet"
  console.time("primeiro teste")
  // console.log(rsaDecryptSHA512(rsaEncryptSHA512(lorem, testPublic), testPrivate));
  rsaDecryptSHA512(rsaEncryptSHA512(lorem, testPublic), testPrivate)
  console.timeEnd("primeiro teste")
  // console.time("segunto teste")
  // console.log(rsaDecryptSHA512(rsaEncryptSHA512(lorem, publicKey), privateKey));
  // console.timeEnd("segunto teste")
  // await disconnectMongo()
})()


let estrair = async () => {

  let robo = new Robo();
  let teste = await robo.acessar({
    url: "https://www.google.com/",
  })
console.log(teste.responseBody);
}




