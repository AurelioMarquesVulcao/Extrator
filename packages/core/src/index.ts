import { convertFolderToPDF } from "./pdf"

export const convertImageFolderPdf = convertFolderToPDF

export const testCore = (name: string) => {
    console.log("olá mundo, me chamo: " + name);
}
testCore("jon Doe")
