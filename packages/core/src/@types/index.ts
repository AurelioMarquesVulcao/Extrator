import { type } from "os";

export type Logs = {};

export type Processing = {
  _id: any;
  dataProcessingId: string;
  processed: boolean;
  dataProcessing: object;
  createdAt: Date;
  __v: number;
};

export type Extracting = {
  dataProcessingId: string;
  processingId: string;
  dataExtraction: object;
  status: string;
};
