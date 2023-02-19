import Mongoose from 'mongoose'

const LoggerSchema = new Mongoose.Schema({
  level:{ type: String, required: true },
  service:{ type: String, required: true },
  message:{ type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

export const LoggerModel = Mongoose.model('Logger', LoggerSchema)
