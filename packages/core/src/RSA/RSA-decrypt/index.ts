const crypto = require("crypto");

export const rsaDecryptSHA512 = (text: string, privateKey: any): any => {
  try {
    const decryptedData = crypto.privateDecrypt(
      {
        key: privateKey,
        // In order to decrypt the data, we need to specify the
        // same hashing function and padding scheme that we used to
        // encrypt the data in the previous step
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        // oaepHash: "sha256",
        oaepHash: "sha512",
      },
      Buffer.from(text, "base64")
    );
    console.log("Decrypt sucess");
    return decryptedData.toString()
  } catch  {
    console.error("Error in Decrypt");
    return false
  }
}


