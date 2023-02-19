import { Loggers } from "../Logger";

const { default: axios } = require("axios");
// const cheerio = require('cheerio');
const Fs = require('fs');
const { readFile } = require('fs');
const Path = require('path');
const sleep = require('await-sleep')

const logger = new Loggers("downloader", "downloader");


export const downloadSoft = async (link: any, folder: string, nameFile: string, extensionFile: string) => {
  try {
    let name
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    
    // verifica se a pasta aterior a pasta final existe
    // se não existe cria
    const regex = /(\S*)\//gm;
    if (!Fs.existsSync(folder.match(regex)[0])) {
      Fs.mkdirSync(folder.match(regex)[0]);
    }
    // verifica se a pasta final do download existe
    // se não existe cria
    if (!Fs.existsSync(folder)) {
      Fs.mkdirSync(folder);
    }

    for (let i = 0; i < link.length; i++) {
      // await 2 seconds for each download
      await sleep(2000)
      // Ajust name file
      if (i < 10) {
        name = nameFile + '0' + i + extensionFile
      } else {
        name = nameFile + i + extensionFile
      }
      const url = link[i];
      const path = Path.resolve(__dirname, folder, name);
      // Download File
      const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream',
        // httpsAgent: proxy,
      });

      response.data.pipe(Fs.createWriteStream(path));
      new Promise((resolve, reject) => {
        response.data.on('end', () => {
          resolve(null);
          logger.info('Url foi baixada com sucesso.' + i)
          // console.log('Url foi baixada com sucesso.' + i);

        });
        response.data.on('error', (err) => {
          reject(err);
          // console.log('Url falhou...');
          logger.error('Url falhou...' + i)

          const error = new Error('Não foi possivél baixar o documento');
          throw error;
        });
      });
    }
  } catch (e) {
    console.log(e);
    console.log('Erro no Download');
  }
}