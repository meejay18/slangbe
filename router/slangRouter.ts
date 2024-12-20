import { Router } from "express";
import {
  createSlang,
  readAllSlang,
  readOneSlang,
} from "../controller/slangController";

const slangRouter: any = Router();

slangRouter.route("/create-slang/:userID").post(createSlang);
slangRouter.route("/read-all-slang").get(readAllSlang);
slangRouter.route("/read-one-slang/:slangID").get(readOneSlang);

export default slangRouter;
