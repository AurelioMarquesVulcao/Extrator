import Mongoose from "mongoose";

const ExtractionSchema = new Mongoose.Schema({
  dataProcessingId: { type: String, required: true },
  processingId: { type: String, required: true },
  extracted: { type: Boolean, required: true },
  erro: { type: Boolean, required: true },
  dataExtraction: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ExtractionModel = Mongoose.model("Extraction", ExtractionSchema);
