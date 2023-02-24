/** @format */

import { conectMongo, convertImageFolderPdf, downloadSoftUrl, Logger, processingSave } from '@extrator/core'
import axios from 'axios'
import cheerioModule from 'cheerio'
import sleep from 'await-sleep'
import Hash from 'object-hash'
import { disconnectMongo } from '@extrator/core'
import { extractionSave } from '@extrator/core'
import { resolve } from 'path'

// Problema na variavél urlPage, esta com problemas devido a tipagem
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

  /**
   * It extracts the manga from the url.
   * @param {string} url - The url of the manga
   * @param {string} manga - name of the manga
   * @param {string} parse - is the selector that will be used to find the images on the page
   * @param {string} parseButton - The button that will be clicked to go to the next chapter.
   * @param {any} caps - [capitulo, capitulos]
   */
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
    const extensionFile = '.jpg'

    logger.info('download iniciado')
    await downloadSoftUrl(await this.parsePages(url, parseButton), pasta, manga, extensionFile)

    await sleep(5000)
    logger.info('download finalizado')
    logger.info('conversão em pdf iniciada')
    await convertImageFolderPdf(pasta, pastaSainda)
    logger.info('Extracting cap: ' + this.capitulo + ' end!')

    this.capitulo++

    /* A recursive function that will be called until the end of the manga. */
    if (this.capitulo < this.capitulos + 1) {
      await sleep(5000)
      logger.info('Nova extração iniciada')
      await this.extract(urlPage[urlPage.length - 1], manga, parse, parseButton, caps)
    }
  }

  /**
   * It takes a url as an argument, makes a request to that url, and returns the HTML data from that request
   * @param {string} url - The url of the site you want to extract
   * @returns The HTML data from the site
   */
  async extractPage(url: string) {
    const site = await axios.get(url)
    const dataSite = site.data
    return dataSite
  }

  /**
   * Extract the page, then extract the url of the next page, then extract the image.
   * @param {string} firstPage - the first page of the manga
   * @param {string} parseButton - is the button that will be used to navigate through the pages of the
   * manga.
   * @returns An array of url strings for download images.
   */
  async parsePages(firstPage: string, parseButton: string): Promise<Array<string>> {
    const body = await this.extractPage(firstPage)
    const $ = cheerioModule.load(body) //cheerio.load(body)
    // para Leitor.net
    $(parseButton).each(async function (element) {
      let datas = $(this).attr('href')
      urlPage.push(datas)
    })
    return await this.parseImage(firstPage)
  }

  /**
   * It takes a page as a parameter, extracts the body of the page, loads the body into cheerio, and
   * then extracts the image URLs from the body
   * @param {string} page - url string - The page you want to extract the images from.
   * @returns An array of url strings for download images
   */
  async parseImage(page: string): Promise<Array<string>> {
    let url = []
    const body = await this.extractPage(page)
    const $ = cheerioModule.load(body)
    $(this.parseImages).each(async function (element) {
      let datas = $(this).attr('src')
      url.push(datas)
    })
    // REMOVE URL DESNECESSARIAS
    url.shift()
    return url
  }
}
