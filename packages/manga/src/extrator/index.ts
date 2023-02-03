import { convertImageFolderPdf, downloadSoftUrl } from "@extrator/core"
import axios from "axios"
import cheerioModule from "cheerio"
const sleep = require('await-sleep')
// import { down } from "@extrator/core";


var manga = "one-piece"
var urlManga = "https://mangayabu.top/ler/one-piece-capitulo-701-my12892/"

var parseImages = 'img[gear="satoshi"]'
//var parseProximoCapitulo = 'a[title="Próximo Capítulo"]'


var capitulo
var capitulos
var urlPage = []

// parsePages(urlManga)

var parseProximoCapitulo = 'a[title="Próximo Capítulo"]'

export const extractManga = async (url: string, manga: string, parse: string, paseButton: string, caps: any) => {
  // console.log(url);
  // console.log(manga);
  // console.log(parse);
  // console.log(paseButton);
  // console.log(caps);
  capitulo = caps[0]
  capitulos = caps[1]


  // start extraction
  await extract(url, manga, parse, paseButton, caps)
}

const extract = async (url: string, manga: string, parse: string, paseButton: string, caps: any) => {
  urlPage = []
  const pasta = "/home/vulcao/aurelio/Extrator/downloads/" + manga + "/" + capitulo
  const pastaSainda = "/home/vulcao/aurelio/Extrator/downloads/" + capitulo + " - " + manga + ".pdf"
  const extensionFile = ".jpg"

  await downloadSoftUrl(await parsePages(url, manga, parse, paseButton, caps), pasta, manga, extensionFile)
  await sleep(5000)
  await convertImageFolderPdf(pasta, pastaSainda)
  capitulo++
  if (capitulo < capitulos + 1) {
    await sleep(5000)
    await extract(urlPage[urlPage.length - 1], manga, parse, paseButton, caps)
  }

}

// extract html from first page
const extractPage = async (url: string) => {
  const site = await axios.get(url)
  const dataSite = site.data
  return dataSite
}

const parsePages = async (firstPage: string, manga: string, parse: string, paseButton: string, caps: any) => {
  const body = await extractPage(firstPage)
  const $ = cheerioModule.load(body)  //cheerio.load(body)
  // para Leitor.net
  $(paseButton).each(async function (element) {
    let datas = $(this).attr('href');
    urlPage.push(datas)
  });
  // console.log("------------------------------");
  // console.log(urlPage);
  // console.log("------------------------------");
  return await parseImage(firstPage)
}

const parseImage = async (page) => {
  let url = []
  const body = await extractPage(page)
  const $ = cheerioModule.load(body)
  $(parseImages).each(async function (element) {
    let datas = $(this).attr("src");
    url.push(datas)
  });
  // REMOVE URL DESNECESSARIAS
  url.shift()
  // console.log(url);
  return url
}

