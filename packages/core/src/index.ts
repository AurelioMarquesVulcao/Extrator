import { downloadSoft } from "./download";
import { convertFolderToPDF } from "./pdf"

export const convertImageFolderPdf = convertFolderToPDF
export const downloadSoftUrl = downloadSoft

export const testCore = (name: string) => {
  console.log("olá mundo, me chamo: " + name);
}
// testCore("jon Doe!")

