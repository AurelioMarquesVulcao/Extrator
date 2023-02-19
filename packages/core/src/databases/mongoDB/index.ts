import dotenv from 'dotenv'
const mongoose = require("mongoose");
// require("dotenv/config");
import {teste} from '../model/teste'


dotenv.config();

export const conectMongo = async(callback = () => null) => {
    try {
        console.log(process.env.MONGO_URL);
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGO_URL, {
            
        })
        // await mongoose.connect(url, {
        //     useCreateIndex: true,
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // });
        console.log("Conectado ao mongo");
       

        // new DataProduct({
        //   creatDate: new Date(),
        // }).save();
        // let teste =DataProduct.findOne({})
        // console.log(teste);
        callback()
    } catch (e) {
        console.log(e);
    }
}

export const disconnectMongo = async() => {
    try {
        // new teste({teste:'teste 01'}).save();
        // let testes =teste.findOne({})
        // console.log(testes);
        await mongoose.connection.close();
        console.log("Desconectado do mongo");
    } catch (e) {
        console.log(e);
    }
}


// export const bootstrap = async (callback = () => null) => {
//     try {
//       dotenv.config()
  
//       console.log(`[INFO] Trying connect to database ${process.env.MONGO_CONNECTION_STRING}`)
//       await Mongoose.connect(process.env.MONGO_CONNECTION_STRING, {})
  
//       requireDefaultModelsDir()
//       RequireDir('./models')
  
//       console.log('[INFO] Successfully database connection')
//       await createRegisters()
  
//       callback()
//     } catch (error) {
//       console.error('[ERROR] Unexpected error on Connecting Mongo Database', error)
//       setTimeout(() => bootstrap(callback), 10000)
//     }
//   }
  