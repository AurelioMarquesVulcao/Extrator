import Mongoose from 'mongoose'

const RequestLogSchema = new Mongoose.Schema({
  type: { type: String, required: true },
  user: { type: String, required: true },
  firebase: { type: Object, required: false },
  ip: { type: String, required: true },
  ipv4: { type: String, required: true },
  ip_localization: {
    latitude: { type: String, required: false },
    longitude: { type: String, required: false },
    cidade: { type: String, required: false },
    estado: { type: String, required: false },
    pais: { type: String, required: false }
  },
  request_body: { type: Object, required: false },
  response_body: { type: Object, required: true },
  response_code: { type: Number, required: true },
  path: { type: String, required: true },
  system: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

export const RequestLogModel = Mongoose.model('RequestLogs', RequestLogSchema)
