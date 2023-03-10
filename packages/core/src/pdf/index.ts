/** @format */

import * as fs from 'fs'
import sizeOf from 'image-size'
import PDFKit from 'pdfkit'
import { Loggers } from '../Logger'

const logger = new Loggers('Gerador de PDF')

/**
 * It takes a folder path and an output path, and then it creates a PDF file with all the images in the
 * folder
 * @param {string} folder - The folder where the images are located
 * @param {string} outputPath - The path where the PDF will be saved.
 */
export const convertFolderToPDF = async (folder: string, outputPath: string): Promise<void> => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }
  let doc = new PDFKit()
  fs.readdir(folder, (_, files) => {
    files.forEach((file, index) => {
      const filePath = `${folder}/${file}`
      try {
        const size = sizeOf(filePath)
        if (index === 0) {
          doc = new PDFKit({
            size: [size.width, size.height],
          })
        } else {
          doc.addPage({ size: [size.width, size.height] })
        }

        doc.image(filePath, 0, 0, { width: size.width, height: size.height })
      } catch {
        return
      }
    })
    doc.pipe(fs.createWriteStream(outputPath))
    doc.end()
    logger.info('PDF Gerado com sucesso')
  })
}
