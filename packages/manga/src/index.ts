import express from 'express'
import cors from 'cors'
import Routes from './routes'
import cluster from 'cluster'
import { resolve } from 'path'
import dotenv from 'dotenv'

// const numCPUs = require('os').cpus().length;
const numCPUs = 1
console.log(numCPUs)



// import {routes} from "routes"
// const cors = require("cors");
// const express = require("express");

const port = process.env.PORT || 3000

// const this.express = express()
class App {
  public express: express.Application
  public constructor() {
    this.express = express()
    // this.database();
    this.middlewares()
    this.routes()

    this.multi()

    console.log(new Date())

    // this.express.listen(port, () =>
    //   console.log(`Sua API REST está funcionando na porta ${port} `)
    // );
    // this.bot();
  }

  middlewares() {
    this.express.use(express.json())
    this.express.use(cors())
  }

  routes() {
    // this.express.use(routes);
    this.express.use('', Routes.router)
  }

  /*
  Abre em multi processamento para não bagunçar a geração de arquivo
  */
  multi() {
    // For Master process
    if (cluster.isMaster) {
      console.log(`Master ${process.pid} is running`)

      // Fork workers.
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
      }
      // This event is firs when worker died
      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
      })
    }

    // For Worker
    else {
      // Workers can share any TCP connection
      // In this case it is an HTTP server
      this.express.listen(port, (err) => {
        err ? console.log('Error in server setup') : console.log(`Worker ${process.pid} started`)
      })
    }
  }
}
module.exports = new App()
