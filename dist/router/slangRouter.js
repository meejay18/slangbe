"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const slangController_1 = require("../controller/slangController");
const slangRouter = (0, express_1.Router)();
slangRouter.route("/create-slang/:userID").post(slangController_1.createSlang);
slangRouter.route("/read-all-slang").get(slangController_1.readAllSlang);
slangRouter.route("/read-one-slang/:slangID").get(slangController_1.readOneSlang);
exports.default = slangRouter;
