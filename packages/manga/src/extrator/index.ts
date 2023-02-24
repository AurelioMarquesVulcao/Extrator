import { conectMongo, convertImageFolderPdf, downloadSoftUrl, Logger, processingSave } from '@extrator/core'
import axios from 'axios'
import cheerioModule from 'cheerio'
import sleep from 'await-sleep'
import Hash from 'object-hash'
import { disconnectMongo } from '@extrator/core'
import { extractionSave } from '@extrator/core'
import { resolve } from 'path'

// // Problema na variavél urlPage, esta com problemas devido a tipagem
var urlPage = []

export class ExtractManga {
  logger: any
  dataProcessingId: string
  processingId: string
  parseImages: string
  capitulo: number
  capitulos: number
  path: string
  constructor() {
    conectMongo()
    this.dataProcessingId
    this.processingId
    this.parseImages
    this.capitulo
    this.capitulos
    this.path = resolve(__dirname, '../../../../')
  }
  async extractManga(url: string, manga: string, parse: string, parseButton: string, caps: any) {
    const save = await processingSave({ url, manga, parse, parseButton, caps })
    this.dataProcessingId = save.dataProcessingId
    this.parseImages = parse
    this.capitulo = caps[0]
    this.capitulos = caps[1]
    console.log(this.path)

    const logger = new Logger('Extrator Manga', this.dataProcessingId)

    logger.info(`Extrator Manga: ${manga}`)
    logger.info('Extracting manga: ' + manga)

    // start extraction
    await this.extract(url, manga, parse, parseButton, caps)
    logger.info('Extracting manga: ' + manga + ' end!')
    disconnectMongo()
  }

  async extract(url: string, manga: string, parse: string, parseButton: string, caps: any) {
    // criando identificador child
    this.processingId = Hash({ url, manga, parse, parseButton, caps, date: new Date() })
    const extract = { url, manga, parse, parseButton, caps, date: new Date() }

    await extractionSave(this.dataProcessingId, this.processingId, extract, 'started')

    const logger = new Logger('Extrator Manga', this.dataProcessingId, this.processingId)

    urlPage = []
    const pasta = `${this.path}/downloads/${manga}/${this.capitulo}`
    const pastaSainda = `${this.path}/downloads/${manga}/${this.capitulo} - ${manga}.pdf`
    // '/home/vulcao/aurelio/Extrator/downloads/' + manga + '/' + this.capitulo + ' - ' + manga + '.pdf'
    // const pasta = "/app/downloads/" + manga + "/" + this.capitulo;
    // const pastaSainda =
    //   "/app/downloads/" + manga + "/" + this.capitulo + " - " + manga + ".pdf";
    const extensionFile = '.jpg'

    logger.info('download iniciado')
    await downloadSoftUrl(await this.parsePages(url, manga, parse, parseButton, caps), pasta, manga, extensionFile)

    await sleep(5000)
    logger.info('download finalizado')
    logger.info('conversão em pdf iniciada')
    await convertImageFolderPdf(pasta, pastaSainda)
    logger.info('Extracting cap: ' + this.capitulo + ' end!')

    this.capitulo++
    if (this.capitulo < this.capitulos + 1) {
      await sleep(5000)
      logger.info('Nova extração iniciada')
      console.log(urlPage[urlPage.length - 1], manga, parse, parseButton, caps)

      await this.extract(urlPage[urlPage.length - 1], manga, parse, parseButton, caps)
    }
  }

  // extract html from first page
  async extractPage(url: string) {
    const site = await axios.get(url)
    const dataSite = site.data
    return dataSite
  }

  async parsePages(firstPage: string, manga: string, parse: string, paseButton: string, caps: any) {
    const body = await this.extractPage(firstPage)
    const $ = cheerioModule.load(body) //cheerio.load(body)
    // para Leitor.net
    $(paseButton).each(async function (element) {
      let datas = $(this).attr('href')
      urlPage.push(datas)
    })
    return await this.parseImage(firstPage)
  }

  async parseImage(page) {
    let url = []
    const body = await this.extractPage(page)
    const $ = cheerioModule.load(body)
    $(this.parseImages).each(async function (element) {
      let datas = $(this).attr('src')
      url.push(datas)
    })
    // REMOVE URL DESNECESSARIAS
    url.shift()
    // console.log(url);
    return url
  }
}
