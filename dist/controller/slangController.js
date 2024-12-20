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
exports.readOneSlang = exports.readAllSlang = exports.createSlang = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const SlangModel_1 = __importDefault(require("../model/SlangModel"));
const mongoose_1 = require("mongoose");
const createSlang = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { word, meaning } = req.body;
        const { userID } = req.params;
        const findUser = yield userModel_1.default.findById(userID);
        if (findUser) {
            const slang = yield SlangModel_1.default.create({
                word,
                meaning,
                createdAt: Date.now(),
                userID,
            });
            findUser === null || findUser === void 0 ? void 0 : findUser.slangs.push(new mongoose_1.Types.ObjectId(slang === null || slang === void 0 ? void 0 : slang._id));
            findUser === null || findUser === void 0 ? void 0 : findUser.save();
            return res.status(201).json({
                message: "Slang created successfully",
                data: slang,
            });
        }
        else {
            return res.status(404).json({
                message: "You are not authorized to make a post because you are not a user",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating slang",
            data: error,
        });
    }
});
exports.createSlang = createSlang;
const readAllSlang = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slang = yield SlangModel_1.default.find().sort({
            createdAt: -1,
        });
        return res.status(200).json({
            message: "all slangs read successfully",
            data: slang,
            status: 200,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error getting all slangs",
            data: error,
        });
    }
});
exports.readAllSlang = readAllSlang;
const readOneSlang = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slangID } = req.params;
        const readSlang = yield SlangModel_1.default.findById(slangID);
        return res.status(200).json({
            message: "Slang read successfully",
            data: readSlang,
            status: 200,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error getting one slang",
            data: error,
        });
    }
});
exports.readOneSlang = readOneSlang;
