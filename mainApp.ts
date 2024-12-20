import { Application, Request, Response } from "express";

import slangRouter from "./router/slangRouter";
import userRouter from "./router/userRouter";

export const mainApp = async (app: Application) => {
  try {
    app.use("/api", userRouter);
    app.get("/", (req: Request, res: Response): any => {
      try {
        app.use("/api/slang", slangRouter);
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
