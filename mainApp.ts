import { Application, Request, Response } from "express";

export const mainApp = async (app: Application) => {
  try {
    app.get("/", (req: Request, res: Response): any => {
      try {
        return res.status(20).json({
          message: "Welcome to slang App",
          status: 200,
        });
      } catch (error) {
        return res.status(404).json({
          message: "Error",
        });
      }
    });
  } catch (error) {
    return error;
  }
};
