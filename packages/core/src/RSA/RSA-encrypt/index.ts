import crypto from "crypto";
import { Loggers } from "../../Logger";
const logger = new Loggers("teste", "crypto")

export const rsaEncryptSHA512 = (text: string, publicKey: any): any => {
  try {
    const encryptedData = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        // oaepHash: "sha256",
        oaepHash: "sha512",
      },
      // We convert the data string to a buffer using `Buffer.from`
      Buffer.from(text)
    );
    logger.info("Encrypt sucessfull")
    return encryptedData.toString("base64")
  } catch {
    logger.error("Erro Decrypt");
  }
}


