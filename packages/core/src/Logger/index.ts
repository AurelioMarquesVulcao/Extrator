/** @format */

import winston from 'winston'
import { LoggerModel } from '../databases/models/logger'

// const ambiente = "production"
// const ambiente = "develop"

/* It logs the message to the console and saves it to the database */
export class Loggers {
  service: string
  logs: Array<any>
  consoleLogger: any
  processId: string
  childProcessId: string

  /**
   * The constructor function is used to create a new instance of the Logger class
   * @param {string} service - The name of the service that is logging.
   * @param [processId] - The process ID of the service.
   * @param [childProcessId] - This is the id of the child process that is being logged.
   */
  constructor(service: string, processId = '', childProcessId = '') {
    this.service = service
    this.processId = processId
    this.childProcessId = childProcessId
    this.logs = []

    this.consoleLogger = winston.createLogger({
      transports: [
        new winston.transports.File({
          filename: 'error.log',
          level: 'error',
          format: winston.format.json(),
        }),

        // new winston.transports.File({
        //   filename: 'error.log',
        //   level: 'info',
        //   format: winston.format.json()
        // }),
        // new winston.transports.Console({
        //   level: 'info',
        //   format: winston.format.json()
        // })
        new winston.transports.Console({
          level: 'info',
          format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
        // level: 'error',
        // options: {
        //   useUnifiedTopology: true
        // },
        // collection: 'Server Logs',
        // format: winston.format.combine(
        //   winston.format.timestamp(),
        //   winston.format.json()
        // )
      ],
    })
  }

  /**
   * The function takes a string as an argument, pushes the string to the logs array, calls the
   * saveLogs function, and returns the consoleLogger.info function
   * @param {string} log - string - the log message
   * @returns The consoleLogger.info method is being returned.
   */
  info(log: string) {
    this.logs.push(`${this.service}  - ${log}`)
    this.saveLogs('info', this.service, log)
    return this.consoleLogger.info(`${this.service} -> ${log}`)
  }

  /**
   * It logs the error message to the console and saves it to the database.
   * @param {string} log - string - the log message
   * @returns The consoleLogger.error method is being returned.
   */
  error(log: string) {
    this.logs.push(`${this.service}  - ${log}`)
    this.saveLogs('error', this.service, log)
    return this.consoleLogger.error(`${this.service} -> ${log}`)
  }

  /**
   * The function takes a string as an argument, pushes the string to the logs array, calls the
   * saveLogs function, and returns the consoleLogger.warn function
   * @param {string} log - string - The log message
   * @returns The consoleLogger.warn method is being returned.
   */
  warn(log: string) {
    this.logs.push(`${this.service}  - ${log}`)
    this.saveLogs('warn', this.service, log)
    return this.consoleLogger.warn(`${this.service} -> ${log}`)
  }

  /**
   * It logs the message to the console and saves it to the database.
   * @param {string} log - string - The log message
   * @returns The consoleLogger.debug method is being returned.
   */
  debug(log: string) {
    this.logs.push(`${this.service}  - ${log}`)
    this.saveLogs('debug', this.service, log)

    return this.consoleLogger.debug(`${this.service} -> ${log}`)
  }

  /**
   * The function resets the logs array to an empty array
   */
  resetLog() {
    this.logs = []
  }

  /**
   * It saves a log in the database
   * @param {string} level - The level of the log, which can be:
   * @param {string} service - The name of the service that is logging the message.
   * @param {string} message - The message to be logged.
   */
  saveLogs(level: string, service: string, message: string) {
    if (this.processId.length > 0) {
      new LoggerModel({
        processId: this.processId,
        childProcessId: this.childProcessId,
        level,
        service,
        message,
      }).save()
    } else {
      new LoggerModel({
        level,
        service,
        message,
      }).save()
    }
  }

  //Para tranferir os logs entre arquivos

  allLog() {
    return this.logs
  }

  addLog(logs: Array<any>) {
    for (let i = 0; i < logs.length; i++) {
      this.logs.push(logs[i])
    }
  }
}
