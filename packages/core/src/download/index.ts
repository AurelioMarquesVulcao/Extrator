const { default: axios } = require("axios");
const cheerio = require('cheerio');
const Fs = require('fs');
const { readFile } = require('fs');
const { setMaxIdleHTTPParsers } = require("http");
const Path = require('path');
const sleep = require('await-sleep')

const hummus = require("hummus")
const streamToPromise = require("stream-to-promise")
// const sleep = require('await-sleep')

const ImagesToPDF = require('images-pdf');
const imagesToPdf = require("images-to-pdf")


var manga = "one-piece"
var urlManga = "https://mangayabu.top/ler/one-piece-capitulo-701-my12892/"
var parseImages = 'img[gear="satoshi"]'
var parseProximoCapitulo = 'a[title="Próximo Capítulo"]'
var capitulo = 701
var capitulos = 1073
var images = []


export const downloadSoft = async (link: string, folder: string) => {
  try {
    images = []
    const local = "/home/vulcao/meta/Servidor/extratorManga/downloads/" + manga + '/' + capitulo
    let dir = 'downloads/' + manga + '/' + capitulo
    console.log(dir);
    // const link = await parse()
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    

    if (!Fs.existsSync(dir)) {
      Fs.mkdirSync(dir);
    }
    let name
    for (let i = 0; i < link.length; i++) {
      await sleep(2000)
      // console.log(link[i]);
      if (i < 10) {
        name = capitulo + manga + '0' + i + '.jpg'
      } else {
        name = capitulo + manga + i + '.jpg'
      }
      images.push("downloads/" + manga + '/' + capitulo + "/" + name)
      const url = link[i];
      const path = Path.resolve(__dirname, local, name);
      const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream',
        // httpsAgent: proxy,
      });
      // await console.log(!!Fs.createWriteStream(path));
      // console.log(path);
      response.data.pipe(Fs.createWriteStream(path));
      new Promise((resolve, reject) => {
        response.data.on('end', () => {
          resolve(null);
          console.log('Url foi baixada com sucesso.' + i);
          // logger.info('Url foi baixada com sucesso.');
        });
        response.data.on('error', (err) => {
          reject(err);
          console.log('Url falhou...');
          // logger.info('Url falhou...');
          const error = new Error('Não foi possivél baixar o documento');
          // error.code = 'Extração falhou no download de documentos';
          throw error;
        });
      });

    }

  } catch (e) {
    console.log(e);
    console.log('Erro no Download');
  }
  await sleep(25000)
}