"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const slangRouter_1 = __importDefault(require("./router/slangRouter"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const mainApp = (app) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.use("/api/user", userRouter_1.default);
        app.use("/api/slang", slangRouter_1.default);
        app.get("/", (req, res) => {
            try {
                res.status(200).json({
                    message: "Welcome to slang App",
                    status: 200,
                });
            }
            catch (error) {
                res.status(404).json({
                    message: error,
                });
            }
        });
    }
    catch (error) {
        return error;
    }
});
exports.mainApp = mainApp;
