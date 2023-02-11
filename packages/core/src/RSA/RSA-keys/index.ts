import test from "node:test";

const crypto = require("crypto");

export const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    // The standard secure default length for RSA keys is 2048 bits
    modulusLength: 2048 * 2,
});

// console.log(publicKey.toString("base64"));
// console.table(privateKey.toString("base64"));
console.log(
  // publicKey.export({
  //     type: "pkcs1",
  //     format: "pem",
  // }),


  // privateKey.export({
  //     type: "pkcs1",
  //     format: "pem",
  // })
)
