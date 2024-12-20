import { Router } from "express";
import {
  createUser,
  loginUser,
  readAllUsers,
  readoneUser,
} from "../controller/userController";

const router: any = Router();

router.route("/create-user").post(createUser);
router.route("/login").post(loginUser);
router.route("/read-one-user/:userID").get(readoneUser);
router.route("/read-all-users").get(readAllUsers);

export default router;
