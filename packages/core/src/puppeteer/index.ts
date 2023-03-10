/** @format */

import puppeteer from 'puppeteer'
import sleep from 'await-sleep'

export const getPage = async (url: string, ...args: Array<Function>) => {
  const multiplas = '#reader-wrapper > div.reader-navigation.clear-fix > div.orientation-container.orientation-toggle'
  const proximo =
    '#reader-wrapper > div.reader-navigation.clear-fix > div.chapter-selection-container > div.chapter-next'
  try {
    console.log('liguei')

    const browser = await puppeteer.launch({ headless: false })
    //   const browser = await puppeteer.launch({
    //     headless: true,
    //     // args: ['--no-sandbox', '--disable-setuid-sandbox'],
    // args: ['--ignore-certificate-errors', '--no-sandbox', '--headless', '--disable-gpu']
    //   });
    const page = await browser.newPage()
    console.log('passei')
    await page.goto(url, {
      waitUntil: 'load',
      timeout: 25000,
    })
    // // await sleep(13000)
    // await page.setViewport({ width: 1080, height: 10024 })
    // await sleep(3000)
    // console.log(await page.content())
    // const data = await html(page)
    // console.log(data)
    let retorno = []
    args.forEach(async arg => {
      retorno.push(await arg(page, proximo, multiplas))

      // console.log(await arg(page, proximo))
    })
    await sleep(3000)
    console.log(retorno)
    console.log(await page.evaluate(() => document.location.href))

    await browser.close()
    console.log('Fechei')

    // return page
  } catch (e) {
    console.log(e)

    // await shell.exec('pkill chrome');
    // await mongoose.connection.close()
    // process.exit()
  }
}

export const html = async (page: any) => {
  return await page.evaluate(() => document.querySelector('*').outerHTML)
}

export const clickButton = async (page: any, button: string) => {
  await page.click(button)
}

export const newUrl = page => {
  page.url()
}

export const test_1 = () => {
  console.log('teste -1')
}
export const test_2 = () => {
  console.log('teste -2')
}
