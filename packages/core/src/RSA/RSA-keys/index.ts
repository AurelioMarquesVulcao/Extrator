import test from "node:test";

const crypto = require("crypto");


const generate = (options = "soft") => {
  let keyForce = 2048
  if (options === "hard") keyForce = 4096
  if (options === "hardest") keyForce = 6144
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    // The standard secure default length for RSA keys is 2048 bits
    modulusLength: keyForce,
  });
  return {
    "publicKey": publicKey.export({ type: "pkcs1", format: "pem", }),
    "privateKey": privateKey.export({ type: "pkcs1", format: "pem", })
  }
}


export const { publicKey, privateKey } = generate("hard")

// console.log(publicKey.toString("base64"));
// console.table(privateKey.toString("base64"));
