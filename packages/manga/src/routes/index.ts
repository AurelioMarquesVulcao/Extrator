import express, { Router } from 'express'
import { extractManga } from '../extrator'

class Routes {
  public router: Router
  constructor() {
    this.router = express.Router()
    this.open()
    this.extracMangas()
  }
  private open(): void {
    this.router.get('/', (req,res)=>{
      res.send({ message: "Você esta no APP " });
    }  
    )
  }
  private extracMangas():void{
    this.router.post('/extract',(req,res)=>{
      // console.log(req);
      // console.log(req.body);
      extractManga(req.body.url,req.body.manga,req.body.parse)
      res.send({ message: "Extração iniciada" });
    })
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