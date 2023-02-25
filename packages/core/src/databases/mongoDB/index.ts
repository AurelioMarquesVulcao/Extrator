/** @format */

import dotenv from 'dotenv'
import mongoose, { Model } from 'mongoose'
import RequireDir from 'require-dir'
import { Loggers } from '../../Logger'
import { TesteModel } from '../models/teste'
import Hash from 'object-hash'
import { ProcessingModel } from '../models/processing'
import sleep from 'await-sleep'
import { ExtractionModel } from '../models/extraction'
import { Extracting, Processing } from '../../@types'

dotenv.config()
const logger = new Loggers('MongoDB')

export const conectMongo = async (callback = () => null) => {
  try {
    logger.info(process.env.MONGO_URL)
    mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.MONGO_URL, {})
    // await mongoose.connect(url, {
    //     useCreateIndex: true,
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // });

    RequireDir('../models')

    logger.info('Conectado ao mongo')

    await testaconection()

    callback()
  } catch (e) {
    logger.error(e)
  }
}

export const disconnectMongo = async () => {
  try {
    logger.info('Desconectando do mongoDB')
    await sleep(500)
    await mongoose.connection.close()
  } catch (e) {
    disconnectMongo()
    logger.error(e)
  }
}

/**
 * It saves a dataProcessing object to the database, and returns the saved object
 * @param {object} dataProcessing - object
 * @returns The processing object
 */
export const processingSave = async (dataProcessing: object): Promise<Processing> => {
  await genericSave(
    ProcessingModel,
    {
      dataProcessingId: Hash(dataProcessing),
      // processingId: Hash((dataProcessing["Date"] = Date.now)),
      processed: false,
      dataProcessing,
    },
    'dataProcessingId'
  )
  return await ProcessingModel.findOne({
    dataProcessingId: Hash(dataProcessing),
  })
}

export const extractionSave = async (
  dataProcessingId: string,
  processingId: string,
  dataExtraction: object,
  status: string
): Promise<void> => {
  console.log(processingId)

  if (status === 'started') {
    await genericSave(
      ExtractionModel,
      {
        dataProcessingId,
        processingId,
        extracted: false,
        erro: false,
        dataExtraction,
      },
      'processingId'
    )
  }
  if (status === 'runing') {
    // generic update
  }
  if (status === 'finished') {
    // generic update
  }
  if (status === 'error') {
    // generic update
  }
}

/**
 *
 * @param model Model criado com o mongoose, Basicamente a colection onde salvar
 * @param modelObject O objeto que será salvo no mongoDB

 */
const genericSave = async (model: any, modelObject: object, validateId: string): Promise<void> => {
  console.time('Tempo de salvamento no MongoDB')
  const data = new model(modelObject)
  console.log({ [validateId]: data[validateId] })

  const validate = await model.findOne({
    [validateId]: data[validateId],
  })
  if (validate) {
    logger.warn('Já existe um processo com o mesmo ID')
  } else {
    await data.save()
    logger.info('Processo salvo com sucesso')
  }
  console.timeEnd('Tempo de salvamento no MongoDB')
}
const testaconection = async () => {
  // console.time("find One");
  const settings = await TesteModel.findOne()
  // console.timeEnd("find One");
  // console.log(settings);
  if (!settings) {
    let data = [new TesteModel({ teste: 'foi' })]
    await data.forEach(async item => item.save())
  }
}
