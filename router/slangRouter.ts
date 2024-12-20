import { Router } from "express";
import { createSlang } from "../controller/slangController";

const slangRouter: any = Router();

slangRouter.route("/create-slang/:userID").post(createSlang);

export default slangRouter;
