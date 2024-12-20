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

export const readAllSlang = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const slang = await slangModel.find().sort({
      createdAt: -1,
    });
    return res.status(200).json({
      message: "all slangs read successfully",
      data: slang,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error getting all slangs",
      data: error,
    });
  }
};

export const readOneSlang = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { slangID } = req.params;

    const readSlang = await slangModel.findById(slangID);

    return res.status(200).json({
      message: "Slang read successfully",
      data: readSlang,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error getting one slang",
      data: error,
    });
  }
};
