import { Request, Response } from "express";
import bcrypt from "bcrypt";
import path from "node:path";
import cloudinary from "../utils/cloudinary";

// export const createUser = async (
//   req: any,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const { name, email, password, avatar, avatarID } = req.body;

//     const folderPath = path.join(__dirname, "../uploads");

//     const salt = await bcrypt.genSalt(9);
//     const hashed = await bcrypt.hash(password, salt);

//     const { secure_ url, public_id} = await cloudinary.uploader.upload(req.file?.path)
//   } catch (error) {
//     return res.status(404).json({
//       message: "Error creating user",
//       status: 404,
//     });
//   }
// };
