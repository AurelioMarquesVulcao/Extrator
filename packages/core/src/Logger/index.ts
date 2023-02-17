// import {winston} from 'winston'
import winston from 'winston';


// const ambiente = "production"
// const ambiente = "develop"

/**
 * @type {Class} Logger
 * @param {string} service
 * @param {Array<any>} logs
 * @param {any} consoleLogger
 */
export class Loggers {
  service: string;
  logs: Array<any>;
  consoleLogger: any
  // log: any

  constructor(
    nomeArquivo = '',
    service: string,
  ) {
    this.service = service;
    this.logs = [];
    // this.log
    // if (ambiente === "production") {
    //   this.log = new winston.transports.Console({
    //     level: 'info',
    //     format: winston.format.json()
    //   })
    // }
    // if (ambiente === "develop") {
    //   this.log = new winston.transports.Console({
    //     level: 'info',
    //     format: winston.format.combine(
    //       winston.format.colorize(),
    //       winston.format.simple()
    //     )
    //   })
    // }

    this.consoleLogger = winston.createLogger({
      transports: [
        new winston.transports.File({
          filename: 'error.log',
          level: 'error',
          format: winston.format.json()
        }),
        new winston.transports.File({
          filename: 'error.log',
          level: 'info',
          format: winston.format.json()
        }),
        // new winston.transports.Console({
        //   level: 'info',
        //   format: winston.format.json()
        // })
        new winston.transports.Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        })
      ]
    });


  }

  /**
   * Faz um print no console
   * @param {string} log mensagem
   */
  info(log: string) {
    this.logs.push(`${this.service}  - ${log}`);
    return this.consoleLogger.info(
      `${this.service} -> ${log}`
    );
  }

  /**
   * Faz um print no console de erro
   * @param {string} log mensagem
   */
  error(log: string) {
    this.logs.push(`${this.service}  - ${log}`);
    return this.consoleLogger.error(
      `${this.service} -> ${log}`
    );
  }

  /**
   * Faz um print no console de erro
   * @param {string} log mensagem
   */
  warn(log: string) {
    this.logs.push(`${this.service}  - ${log}`);
    return this.consoleLogger.warn(
      `${this.service} -> ${log}`
    );
  }

  /**
  * Faz um print no console de erro
  * @param {string} log mensagem
  */
  debug(log: string) {
    this.logs.push(`${this.service}  - ${log}`);
    return this.consoleLogger.debug(
      `${this.service} -> ${log}`
    );
  }



  resetLog() {
    this.logs = [];
    return this.logs
  }

  //Para tranferir os logs entre arquivos 

  allLog() {
    return this.logs;
  }

  addLog(logs: Array<any>) {
    for (let i = 0; i < logs.length; i++) {
      this.logs.push(logs[i]);
    }
  }
}