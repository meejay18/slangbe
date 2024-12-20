import { model, Schema, Document, Types } from "mongoose";

interface iUser {
  name: string;
  email: string;
  password: string;
  slangs: Array<{}>;
  avatar: string;
  avatarID: string;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema<iUserData>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    slangs: [
      {
        type: Types.ObjectId,
        ref: "slangs",
      },
    ],
  },
  { timestamps: true }
);

export default model<iUserData>("users", userModel);
