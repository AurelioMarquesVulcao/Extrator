import { downloadSoft } from "./download";
import { convertFolderToPDF } from "./pdf"
import { testPrivate, testPublic } from "./RSA/keys";
import { rsaDecryptSHA512 } from "./RSA/RSA-decrypt";
import { rsaEncryptSHA512 } from "./RSA/RSA-encrypt";
import { privateKey, publicKey } from "./RSA/RSA-keys";
// import { rsaKeyParGenerate } from "./RSA/RSA-keys";


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
let lorem = "Lorem ipsum dolor sit amet, "
console.time("primeiro teste")
console.log(rsaDecryptSHA512(rsaEncryptSHA512(lorem, testPublic), testPrivate));
console.timeEnd("primeiro teste")

console.time("segunto teste")
console.log(rsaDecryptSHA512(rsaEncryptSHA512(lorem, publicKey), privateKey));
console.timeEnd("segunto teste")

// console.log(rsaKeyParGenerate());




