import express, { Router } from 'express'

class Routes {
  public router: Router
  constructor() {
    this.router = express.Router()
    this.open()
  }
  private open(): void {
    this.router.get('/', (req,res)=>{
      res.send({ message: "Você esta no APP " });
    }  
    )
  }
}
export default new Routes()



// import express from "express"

// const routes = express.Router();

// // const { Listening } = require("./messages");

// // const telegram = new Listening();

// routes.get("/", function (req, res) {
//   return res.send({ message: "Você esta no APP " });
// });

// // routes.post("/post", telegram.postMessages);

// // module.exports = routes;
// export default routes