import dotenv from "dotenv";
const mongoose = require("mongoose");
import RequireDir from "require-dir";
import { TesteModel } from "../models/teste";

dotenv.config();

export const conectMongo = async (callback = () => null) => {
  try {
    console.log(process.env.MONGO_URL);
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URL, {});
    // await mongoose.connect(url, {
    //     useCreateIndex: true,
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // });

    RequireDir("../models");

    console.log("Conectado ao mongo");

    await testaconection();

    callback();
  } catch (e) {
    console.log(e);
  }
};

export const disconnectMongo = async () => {
  try {
    await mongoose.connection.close();
    console.log("Desconectado do mongo");
  } catch (e) {
    console.log(e);
  }
};

const testaconection = async () => {
  console.time("find One");
  const settings = await TesteModel.findOne();
  console.timeEnd("find One");
  console.log(settings);
  if (!settings) {
    let data = [new TesteModel({ teste: "foi" })];
    await data.forEach(async (item) => item.save());
  }
};

