import { Request, Response } from "express";
import userModel from "../model/userModel";
import slangModel from "../model/SlangModel";
import { Types } from "mongoose";

export const createSlang = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { word, meaning } = req.body;
    const { userID } = req.params;

    const findUser = await userModel.findById(userID);
    if (findUser) {
      const slang: any = await slangModel.create({
        word,
        meaning,
        createdAt: Date.now(),
        userID,
      });

      findUser?.slangs.push(new Types.ObjectId(slang?._id));
      findUser?.save();

      return res.status(201).json({
        message: "Slang created successfully",
        data: slang,
      });
    } else {
      return res.status(404).json({
        message:
          "You are not authorized to make a post because you are not a user",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating slang",
      data: error,
    });
  }
};
