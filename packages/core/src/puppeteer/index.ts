/** @format */

import puppeteer from 'puppeteer'
import sleep from 'await-sleep'
import { log } from 'console'

var urlInitial: string = ''
export const getPage = async (url: string, ...steps: Array<object>) => {
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
    await page.setViewport({ width: 1080, height: 1024 })
    await sleep(6000)
    urlInitial = url
    const stepsReturn = await stepsProcess(page, browser, ...steps)

    await sleep(3000)
    console.log(stepsReturn)
    // await page[2].close()

    await sleep(5000)
    await browser.close()
    console.log('Fechei')

    return stepsReturn
  } catch (e) {
    console.log(e)

    // await shell.exec('pkill chrome');
    // await mongoose.connection.close()
    // process.exit()
  }
}

const stepsProcess = async (page: any, browser, ...steps: Array<object>) => {
  try {
    let stepsReturn = []
    for (let i = 0; i < steps.length; i++) {
      if (!steps[i][1] && steps[i][0]) {
        stepsReturn.push(await steps[i][0](page, browser))
      }
      if (!steps[i][1]) {
        stepsReturn.push(await steps[i][0]())
      }
      if (steps[i][1]) {
        stepsReturn.push(await steps[i][0](page, browser, steps[i][1]))
      }
      if (steps[i][2]) {
        stepsReturn.push(await steps[i][0](page, browser, steps[i][1], steps[i][2]))
      }
      if (steps[i][3]) {
        stepsReturn.push(await steps[i][0](page, browser, steps[i][1], steps[i][2], steps[i][3]))
      }
      if (steps[i][4]) {
        await steps[i][0](page, browser, steps[i][1], steps[i][2], steps[i][3], steps[i][4])
      }
      await sleep(1000)
    }
    // steps.forEach(async step => {
    //   if (!step[1] && step[0]) {
    //     stepsReturn.push(await step[0](page, browser))
    //   }
    //   if (!step[1]) {
    //     stepsReturn.push(await step[0]())
    //   }
    //   if (step[1]) {
    //     stepsReturn.push(await step[0](page, browser, step[1]))
    //   }
    //   if (step[2]) {
    //     stepsReturn.push(await step[0](page, browser, step[1], step[2]))
    //   }
    //   if (step[3]) {
    //     stepsReturn.push(await step[0](page, browser, step[1], step[2], step[3]))
    //   }
    //   if (step[4]) {
    //     await step[0](page, browser, step[1], step[2], step[3], step[4])
    //   }
    // })
    await sleep(2000)
    stepsReturn = stepsReturn.filter(element => !!element)
    return {
      url: stepsReturn.filter(element => element.length < 500),
      html: stepsReturn.find(element => element.length < 500),
    }
  } catch (err) {
    console.log('erro')
    console.log(err)
  }
}

export const html = async (page: any, browser) => {
  if (page) {
    return await page.evaluate(() => document.querySelector('*').outerHTML)
  } else {
    return null
  }
}

export const clickButton = async (page: any, browser, button: string) => {
  try {
    await page.click(button)
    // await page.click(button)
    // await page.click(button)
    await sleep(1000)
    let pages = await browser.pages()
    console.log(pages.length)
    if (pages.length != 2) {
      const popup = pages[pages.length - 1]
      console.log('Fechando popup')
      await popup.close()
      await clickButton(page, browser, button)
    }
    const Url = await newUrl(page, browser)
    await sleep(1200)

    console.log(urlInitial, Url)

    if (urlInitial == Url || urlInitial.length + 1 < Url.length) {
      await clickButton(page, browser, button)
    }
    await sleep(1000)
    return Url
  } catch {
    await sleep(1000)
    await clickButton(page, browser, button)
  }
}

export const newUrl = async (page: any, browser) => {
  if (page) {
    await sleep(3000)
    return await page.evaluate(() => document.location.href)
  } else {
    return null
  }
}

export const test_1 = test => {
  console.log('teste -1 ' + test)
}
export const test_2 = test => {
  console.log('teste -2 ' + test)
}
export const test_3 = () => {
  console.log('teste -3 ')
}

export const autoScroll = async (page, browser) => {
  if (page) {
    for (let i = 0; i < 20; i++) {
      await sleep(200)
      page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight)
      })
    }
  } else {
    return null
  }
}
