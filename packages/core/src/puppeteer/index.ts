/** @format */

import puppeteer from 'puppeteer'
import sleep from 'await-sleep'

export const getPage = async (url: string, ...steps: Array<object>) => {
  const multiplas = '#reader-wrapper > div.reader-navigation.clear-fix > div.orientation-container.orientation-toggle'
  const proximo =
    '#reader-wrapper > div.reader-navigation.clear-fix > div.chapter-selection-container > div.chapter-next'
  try {
    console.log('liguei')

    const browser = await puppeteer.launch({ headless: true })
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
    await sleep(3000)
    // let stepsReturn = []
    // steps.forEach(async step => {
    //   if (!step[1] && step[0]) {
    //     stepsReturn.push(await step[0](page))
    //     console.log('foi')
    //   }
    //   if (!step[1]) {
    //     stepsReturn.push(await step[0]())
    //   }
    //   if (step[1]) {
    //     stepsReturn.push(await step[0](page, step[1]))
    //   }
    //   if (step[2]) {
    //     stepsReturn.push(await step[0](page, step[1], step[2]))
    //   }
    //   if (step[3]) {
    //     stepsReturn.push(await step[0](page, step[1], step[2], step[3]))
    //   }
    //   if (step[4]) {
    //     await step[0](page, step[1], step[2], step[3], step[4])
    //   }
    // })
    const stepsReturn = await stepsProcess(page, ...steps)
    console.log(stepsReturn)

    // await autoScroll(page)
    // await scrollToBottom(page)
    await sleep(3000)

    // console.log(await page.evaluate(() => document.location.href))

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

const stepsProcess = async (page: any, ...steps: Array<object>) => {
  try {
    let stepsReturn = []
    steps.forEach(async step => {
      if (!step[1] && step[0]) {
        stepsReturn.push(await step[0](page))
      }
      if (!step[1]) {
        stepsReturn.push(await step[0]())
      }
      if (step[1]) {
        stepsReturn.push(await step[0](page, step[1]))
      }
      if (step[2]) {
        stepsReturn.push(await step[0](page, step[1], step[2]))
      }
      if (step[3]) {
        stepsReturn.push(await step[0](page, step[1], step[2], step[3]))
      }
      if (step[4]) {
        await step[0](page, step[1], step[2], step[3], step[4])
      }
    })
    console.log(stepsReturn)
    return stepsReturn.find(element => !!element)
  } catch {
    console.log('erro')
  }
}

export const html = async (page: any) => {
  return await page.evaluate(() => document.querySelector('*').outerHTML)
}

export const clickButton = async (page: any, button: string) => {
  await page.click(button)
}

export const newUrl = async (page: any) => {
  return await page.evaluate(() => document.location.href)
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

export const autoScroll = async page => {
  for (let i = 0; i < 20; i++) {
    await sleep(200)
    page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight)
    })
  }
}
