import { Router } from "express";
import { createSlang } from "../controller/slangController";

const slangRouter: any = Router();

slangRouter.route("/create-slang").post(createSlang);

export default slangRouter;
