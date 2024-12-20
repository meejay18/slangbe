import { Request, Response } from "express";
import bcrypt from "bcrypt";
import path from "node:path";
import cloudinary from "../utils/cloudinary";
import userModel from "../model/userModel";
import { removeFileUpload } from "../utils/removeFileUpload";

export const createUser = async (
  req: any,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password, avatar, avatarID } = req.body;

    const folderPath = path.join(__dirname, "../uploads");

    const salt = await bcrypt.genSalt(9);
    const hashed = await bcrypt.hash(password, salt);

    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file?.path
    );

    const user = await userModel.create({
      name,
      email,
      password: hashed,
      avatar: secure_url,
      avatarID: public_id,
    });
    removeFileUpload(folderPath);

    return res.status(201).json({
      message: "User created successfully",
      status: 201,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
      status: 404,
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      const check = await bcrypt.compare(password, user.password);

      if (check) {
        return res.status(201).json({
          message: "Login sucessfull",
          status: 201,
          data: user,
        });
      } else {
        return res.status(404).json({
          message: "Error with Password",
          status: 404,
        });
      }
    } else {
      return res.status(404).json({
        message: "Error with email",
        status: 404,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Couldnt login user",
      status: 404,
    });
  }
};

export const readoneUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;

    const user = await userModel.findById(userID);

    return res.status(200).json({
      message: "user found",
      status: 200,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error finding user",
      status: 404,
    });
  }
};

export const readAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await userModel.find();

    return res.status(200).json({
      message: "users read sucessfully",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error finding users",
      status: 404,
    });
  }
};
