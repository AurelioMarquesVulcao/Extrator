/** @format */

const fs = require('fs')
const ytdl = require('ytdl-core')
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above
// ytdl('https://youtube.com/live/-wXPxJYhZeI?feature=share')
//   .pipe(fs.createWriteStream('video.mp4'));

export const youtubeMp3 = (url: string) => {
  return new Promise((resolve, reject) => {
    ytdl(url, {
      quality: 'highestaudio',
      filter: 'audioonly',
      format: 'bestaudio/best',
      out: 'audio.mp3',
    })
      .then(() => {
        resolve('audio.mp3')
      })
      .catch(err => {
        reject(err)
      })
  })
}
export const youtube = async (url: string, name: string) => {
  console.log("iniciado");
    const load = await ytdl(url)
    await load.pipe(fs.createWriteStream(`${name}.mp4`))
  console.log("finalizado");

}
