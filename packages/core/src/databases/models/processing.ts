const Mongoose = require("mongoose");

const ProcessingSchema = new Mongoose.Schema({
  dataProcessingId: { type: String, required: true },
  // processingId: { type: String, required: true },
  processed: { type: Boolean, required: true },
  dataProcessing: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ProcessingModel = Mongoose.model("Processing", ProcessingSchema);
