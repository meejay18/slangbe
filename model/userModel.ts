import { model, Schema, Document } from "mongoose";

interface iUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  avatarID: string;
  verifiedToken: string;
  isVerified: false;
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
    verifiedToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default model<iUserData>("users", userModel);
