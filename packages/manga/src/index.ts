import express from "express"
import cors from "cors"
import Routes from "./routes"
// import {routes} from "routes"
// const cors = require("cors");
// const express = require("express");


const port = "3333"
// const this.express = express()
class App {
  public express: express.Application
  public constructor() {
    this.express = express()
    // this.database();
    this.middlewares();
    this.routes();

    this.express.listen(port, () =>
      console.log(`Sua API REST está funcionando na porta ${port} `)
    );
    // this.bot();
  }



  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  routes() {
    // this.express.use(routes);
    this.express.use('', Routes.router)
  }

  
}
module.exports = new App();