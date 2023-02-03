import { downloadSoft } from "./download";
import { convertFolderToPDF } from "./pdf"

export const convertImageFolderPdf = convertFolderToPDF

export const testCore = (name: string) => {
  console.log("olá mundo, me chamo: " + name);
}
testCore("jon Doe!")

const src = [
  "https://static2.mangalivre.net/firefox/iTw3iRFzdAtXwIHyfHREJw/m11214564/1319/415498/438855/image_boku-no-hero-academia.jpg",
  "https://static2.mangalivre.net/firefox/iTw3iRFzdAtXwIHyfHREJw/m11214564/1319/415498/438855/image_boku-no-hero-academia.jpg",
  "https://static2.mangalivre.net/firefox/iTw3iRFzdAtXwIHyfHREJw/m11214564/1319/415498/438855/image_boku-no-hero-academia.jpg",
  "https://static2.mangalivre.net/firefox/iTw3iRFzdAtXwIHyfHREJw/m11214564/1319/415498/438855/image_boku-no-hero-academia.jpg",
  "https://static2.mangalivre.net/firefox/iTw3iRFzdAtXwIHyfHREJw/m11214564/1319/415498/438855/image_boku-no-hero-academia.jpg",
  "https://static2.mangalivre.net/firefox/iTw3iRFzdAtXwIHyfHREJw/m11214564/1319/415498/438855/image_boku-no-hero-academia.jpg",
  "https://static2.mangalivre.net/firefox/iTw3iRFzdAtXwIHyfHREJw/m11214564/1319/415498/438855/image_boku-no-hero-academia.jpg",
  "https://static2.mangalivre.net/firefox/iTw3iRFzdAtXwIHyfHREJw/m11214564/1319/415498/438855/image_boku-no-hero-academia.jpg",
  "https://static2.mangalivre.net/firefox/iTw3iRFzdAtXwIHyfHREJw/m11214564/1319/415498/438855/image_boku-no-hero-academia.jpg",
  "https://static2.mangalivre.net/firefox/iTw3iRFzdAtXwIHyfHREJw/m11214564/1319/415498/438855/image_boku-no-hero-academia.jpg",
  "https://static2.mangalivre.net/firefox/iTw3iRFzdAtXwIHyfHREJw/m11214564/1319/415498/438855/image_boku-no-hero-academia.jpg",
  "https://static2.mangalivre.net/firefox/iTw3iRFzdAtXwIHyfHREJw/m11214564/1319/415498/438855/image_boku-no-hero-academia.jpg",
  "https://static2.mangalivre.net/firefox/iTw3iRFzdAtXwIHyfHREJw/m11214564/1319/415498/438855/image_boku-no-hero-academia.jpg",
  "https://static2.mangalivre.net/firefox/iTw3iRFzdAtXwIHyfHREJw/m11214564/1319/415498/438855/image_boku-no-hero-academia.jpg",
  "https://static2.mangalivre.net/firefox/iTw3iRFzdAtXwIHyfHREJw/m11214564/1319/415498/438855/image_boku-no-hero-academia.jpg",
  "https://static2.mangalivre.net/firefox/iTw3iRFzdAtXwIHyfHREJw/m11214564/1319/415498/438855/image_boku-no-hero-academia.jpg",
]

const pasta = "/home/aurelio/meta/Extrator/downloads/teste2"
const nameFile = "One Piece"
const extensionFile = ".jpg"
// downloadSoft(src, pasta,nameFile, extensionFile)
