import winston from "winston";
// import { transports } from 'winston';
// require('winston-mongodb').MongoDB;
import { MongoDB } from "winston-mongodb";
import { LoggerModel } from "../databases/models/logger";

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
  consoleLogger: any;
  processId: string;
  childProcessId: string;

  constructor(service: string, processId = "", childProcessId = "") {
    this.service = service;
    this.processId = processId;
    this.childProcessId = childProcessId;
    this.logs = [];

    this.consoleLogger = winston.createLogger({
      transports: [
        new winston.transports.File({
          filename: "error.log",
          level: "error",
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
          level: "info",
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
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
    });
  }

  /**
   * Faz um print no console
   * @param {string} log mensagem
   */
  info(log: string) {
    this.logs.push(`${this.service}  - ${log}`);
    this.saveLogs("info", this.service, log);
    return this.consoleLogger.info(`${this.service} -> ${log}`);
  }

  /**
   * Faz um print no console de erro
   * @param {string} log mensagem
   */
  error(log: string) {
    this.logs.push(`${this.service}  - ${log}`);
    this.saveLogs("error", this.service, log);
    return this.consoleLogger.error(`${this.service} -> ${log}`);
  }

  /**
   * Faz um print no console de erro
   * @param {string} log mensagem
   */
  warn(log: string) {
    this.logs.push(`${this.service}  - ${log}`);
    this.saveLogs("warn", this.service, log);
    return this.consoleLogger.warn(`${this.service} -> ${log}`);
  }

  /**
   * Faz um print no console de erro
   * @param {string} log mensagem
   */
  debug(log: string) {
    this.logs.push(`${this.service}  - ${log}`);
    this.saveLogs("debug", this.service, log);

    return this.consoleLogger.debug(`${this.service} -> ${log}`);
  }

  resetLog() {
    this.logs = [];
    return this.logs;
  }

  saveLogs(level: string, service: string, message: string) {
    console.time("Tempo de salvamento de log");
    if (this.processId.length > 0) {
      new LoggerModel({
        processId: this.processId,
        childProcessId: this.childProcessId,
        level,
        service,
        message,
      }).save();
    } else {
      new LoggerModel({
        level,
        service,
        message,
      }).save();
    }
    console.timeEnd("Tempo de salvamento de log");
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
