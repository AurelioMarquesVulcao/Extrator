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

/* It receives a url, a manga name, a parse, a parseButton, and an array of numbers, and then it saves
the data, sets the dataProcessingId, sets the parseImages, sets the capítulo, sets the capítulos,
sets the path, creates a logger, logs the extraction of the manga, extracts the manga, and then logs
the completion of the extraction */
export class ExtractManga {
  logger: any
  dataProcessingId: string
  processingId: string
  parseImages: string
  capitulo: number
  capitulos: number
  path: string

  /* Initializing the variables. */
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
   * It receives a url, a manga name, a parse, a parseButton, and an array of numbers, and then it
   * saves the data, sets the dataProcessingId, sets the parseImages, sets the capítulo, sets the
   * capítulos, sets the path, creates a logger, logs the extraction of the manga, extracts the manga,
   * and then logs the completion of the extraction
   * @param {string} url - The url of the manga
   * @param {string} manga - The name of the manga
   * @param {string} parse - is the selector that will be used to find the image tag.
   * @param {string} parseButton - The button that will be clicked to load the next page.
   * @param caps - caps for extraction
   */
  async extractManga(url: string, manga: string, parse: string, parseButton: string, caps: Array<number>) {
    const save = await processingSave({ url, manga, parse, parseButton, caps })
    this.dataProcessingId = save.dataProcessingId
    this.parseImages = parse
    this.capitulo = caps[0]
    this.capitulos = caps[1]
    console.log(this.path)

    const logger = new Logger('Extrator Manga', this.dataProcessingId)

    logger.info(`Extraindo Manga: ${manga}`)

    await this.extract(url, manga, parse, parseButton, caps)
    logger.info('-------------- Extração concluída! --------------')
    disconnectMongo()
  }

  /**
   * It downloads the images from the manga, converts them to pdf and saves the pdf in a folder
   * @param {string} url - The url of the manga.
   * @param {string} manga - The name of the manga.
   * @param {string} parse - The parameter that will be used to parse the pages of the manga.
   * @param {string} parseButton - The button that will be clicked to go to the next page.
   * @param {any} caps - The number of chapters in the manga.
   */
  async extract(url: string, manga: string, parse: string, parseButton: string, caps: any) {
    this.processingId = Hash({ url, manga, parse, parseButton, caps, date: new Date() })
    const extract = { url, manga, parse, parseButton, caps, date: new Date() }
    urlPage = []
    const pasta = `${this.path}/downloads/${manga}/${this.capitulo}`
    const pastaSainda = `${this.path}/downloads/${manga}/${this.capitulo} - ${manga}.pdf`
    const extensionFile = '.jpg'

    /* Saving the extraction in the database. */
    await extractionSave(this.dataProcessingId, this.processingId, extract, 'started')

    const logger = new Logger('Extrator Manga', this.dataProcessingId, this.processingId)
    logger.info('Extração iniciada')

    /* Downloading the images from the manga. */
    await downloadSoftUrl(await this.parsePages(url, parseButton), pasta, manga, extensionFile)
    await sleep(5000)

    /* Converting the images downloaded to pdf. */
    logger.info('Conversão em pdf iniciada')
    await convertImageFolderPdf(pasta, pastaSainda)
    logger.info(`Extraçãp do capitulo: ${this.capitulo} FINALIZOU!!!`)

    this.capitulo++

    /* A recursive function that will be called until the end of the manga. */
    if (this.capitulo < this.capitulos + 1) {
      await sleep(5000)
      logger.info(`Nova extração Inicida: Capitulo ${this.capitulo}`)
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
Array<number>