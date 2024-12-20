import { Document, Schema, model } from "mongoose";

interface iSlang {
  word: string;
  meaning: string;
  userID: string;
  createdAt: Date;
}

interface iSlangData extends iSlang, Document {}

const SlangModel = new Schema<iSlangData>(
  {
    word: {
      type: String,
    },
    meaning: {
      type: String,
    },
    userID: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

export default model<iSlangData>("slangs", SlangModel);
