import {
  conectMongo,
  convertImageFolderPdf,
  downloadSoftUrl,
  Logger,
  processingSave,
} from "@extrator/core";
import axios from "axios";
import cheerioModule from "cheerio";
import sleep from "await-sleep";
import Hash from "object-hash";
import { disconnectMongo } from "@extrator/core";
import { extractionSave } from "@extrator/core";

// Problema na variavé de parse
var parseImages;

var capitulo;
var capitulos;
var urlPage = [];

export class ExtractManga {
  logger: any;
  dataProcessingId: string;
  processingId: string;
  constructor() {
    conectMongo();
    this.dataProcessingId;
    this.processingId;
  }
  async extractManga(
    url: string,
    manga: string,
    parse: string,
    parseButton: string,
    caps: any
  ) {
    const save = await processingSave({ url, manga, parse, parseButton, caps });
    this.dataProcessingId = save.dataProcessingId;
    const logger = new Logger("Extrator Manga", this.dataProcessingId);

    logger.info(`Extrator Manga: ${manga}`);

    parseImages = parse;

    // console.log(url);
    // console.log(manga);
    // console.log(parse);
    // console.log(paseButton);
    // console.log(caps);
    capitulo = caps[0];
    capitulos = caps[1];

    logger.info("Extracting manga: " + manga);

    // start extraction
    await this.extract(url, manga, parse, parseButton, caps);
    logger.info("Extracting manga: " + manga + " end!");
    disconnectMongo();
  }

  async extract(
    url: string,
    manga: string,
    parse: string,
    parseButton: string,
    caps: any
  ) {
    // criando identificador child
    this.processingId = Hash({
      url,
      manga,
      parse,
      parseButton,
      caps,
      date: new Date(),
    });

    console.log({ url, manga, parse, parseButton, caps, date: new Date() });

    await extractionSave(
      this.dataProcessingId,
      this.processingId,
      {
        url,
        manga,
        parse,
        parseButton,
        caps,
        date: new Date(),
      },
      "started"
    );

    const logger = new Logger(
      "Extrator Manga",
      this.dataProcessingId,
      this.processingId
    );

    urlPage = [];
    const pasta =
      "/home/aurelio/meta/Extrator/downloads/" + manga + "/" + capitulo;
    const pastaSainda =
      "/home/aurelio/meta/Extrator/downloads/" +
      manga +
      "/" +
      capitulo +
      " - " +
      manga +
      ".pdf";
    // const pasta = "/app/downloads/" + manga + "/" + capitulo;
    // const pastaSainda =
    //   "/app/downloads/" + manga + "/" + capitulo + " - " + manga + ".pdf";
    const extensionFile = ".jpg";

    logger.info("download iniciado");
    await downloadSoftUrl(
      await this.parsePages(url, manga, parse, parseButton, caps),
      pasta,
      manga,
      extensionFile
    );

    await sleep(5000);
    logger.info("download finalizado");
    logger.info("conversão em pdf iniciada");
    await convertImageFolderPdf(pasta, pastaSainda);
    logger.info("Extracting cap: " + capitulo + " end!");

    capitulo++;
    if (capitulo < capitulos + 1) {
      await sleep(5000);
      logger.info("Nova extração iniciada");
      console.log(urlPage[urlPage.length - 1],
        manga,
        parse,
        parseButton,
        caps);
      
      await this.extract(
        urlPage[urlPage.length - 1],
        manga,
        parse,
        parseButton,
        caps
      );
    }
  }

  // extract html from first page
  async extractPage(url: string) {
    const site = await axios.get(url);
    const dataSite = site.data;
    return dataSite;
  }

  async parsePages(
    firstPage: string,
    manga: string,
    parse: string,
    paseButton: string,
    caps: any
  ) {
    const body = await this.extractPage(firstPage);
    const $ = cheerioModule.load(body); //cheerio.load(body)
    // para Leitor.net
    $(paseButton).each(async function (element) {
      let datas = $(this).attr("href");
      urlPage.push(datas);
    });
    // console.log("------------------------------");
    // console.log(urlPage);
    // console.log("------------------------------");
    return await this.parseImage(firstPage);
  }

  async parseImage(page) {
    let url = [];
    const body = await this.extractPage(page);
    const $ = cheerioModule.load(body);
    $(parseImages).each(async function (element) {
      let datas = $(this).attr("src");
      url.push(datas);
    });
    // REMOVE URL DESNECESSARIAS
    url.shift();
    // console.log(url);
    return url;
  }
}
