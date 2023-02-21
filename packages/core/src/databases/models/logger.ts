import Mongoose from 'mongoose'

const LoggerSchema = new Mongoose.Schema({
  processId:{ type: String, required: false },
  childProcessId:{ type: String, required: false },
  level:{ type: String, required: true },
  service:{ type: String, required: true },
  message:{ type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

export const LoggerModel = Mongoose.model('Logger', LoggerSchema)
