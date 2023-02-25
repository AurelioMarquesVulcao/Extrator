/** @format */

import { Loggers } from '../Logger'
import { default as axios } from 'axios'
// const cheerio = require('cheerio');
import Fs from 'fs'
import { readFile } from 'fs'
import Path from 'path'
import sleep from 'await-sleep'
const logger = new Loggers('downloader')

/**
 * It downloads files from a given array of links, to a given folder, with a given name and extension,
 * and with a given logger
 * @param link - Array<string> - The array of links to download.
 * @param {string} folder - The folder where the files will be downloaded.
 * @param {string} nameFile - The name of the file you want to download.
 * @param {string} extensionFile - The file extension.
 */
export const downloadSoft = async (link: Array<string>, folder: string, nameFile: string, extensionFile: string) => {
  try {
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    // verifica se a pasta aterior a pasta final existe
    // se não existe cria

    /* Creating a folder if it doesn't exist. */
    const regex = /(\S*)\//gm
    if (!Fs.existsSync(folder.match(regex)[0])) {
      Fs.mkdirSync(folder.match(regex)[0])
    }
    // verifica se a pasta final do download existe
    // se não existe cria
    if (!Fs.existsSync(folder)) {
      Fs.mkdirSync(folder)
    }

    /* Downloading the files. */
    for (let i = 0; i < link.length; i++) {
      // await 2 seconds for each download
      await sleep(2000)
      // Ajust name file
      if (i < 10) {
        name = nameFile + '0' + i + extensionFile
      } else {
        name = nameFile + i + extensionFile
      }
      const url = link[i]
      const path = Path.resolve(__dirname, folder, name)
      // Download File
      const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream',
        // httpsAgent: proxy,
      })

      response.data.pipe(Fs.createWriteStream(path))
      new Promise((resolve, reject) => {
        response.data.on('end', () => {
          resolve(null)
          logger.info('Url foi baixada com sucesso.' + i)
        })
        response.data.on('error', err => {
          reject(err)
          logger.error('Url falhou...' + i)
          const error = new Error('Não foi possivél baixar o documento')
          throw error
        })
      })
    }
  } catch (e) {
    logger.error(e)
    logger.error('Erro ao baixar os arquivos')
  }
}
