import { Application, Request, Response } from "express";

import slangRouter from "./router/slangRouter";
import userRouter from "./router/userRouter";

export const mainApp = async (app: Application) => {
  try {
    app.use("/api/user", userRouter);
    app.use("/api/slang", slangRouter);

    app.get("/", (req: Request, res: Response) => {
      try {
        res.status(200).json({
          message: "Welcome to slang App",
          status: 200,
        });
      } catch (error) {
        res.status(404).json({
          message: error,
        });
      }
    });
  } catch (error) {
    return error;
  }
};
