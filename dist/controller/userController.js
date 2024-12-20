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
exports.readAllUsers = exports.readoneUser = exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const node_path_1 = __importDefault(require("node:path"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const userModel_1 = __importDefault(require("../model/userModel"));
const removeFileUpload_1 = require("../utils/removeFileUpload");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, email, password, avatar, avatarID } = req.body;
        const folderPath = node_path_1.default.join(__dirname, "../uploads");
        const salt = yield bcrypt_1.default.genSalt(9);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const { secure_url, public_id } = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const user = yield userModel_1.default.create({
            name,
            email,
            password: hashed,
            avatar: secure_url,
            avatarID: public_id,
        });
        (0, removeFileUpload_1.removeFileUpload)(folderPath);
        return res.status(201).json({
            message: "User created successfully",
            status: 201,
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
            status: 404,
        });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            const check = yield bcrypt_1.default.compare(password, user.password);
            if (check) {
                return res.status(201).json({
                    message: "Login sucessfull",
                    status: 201,
                    data: user,
                });
            }
            else {
                return res.status(404).json({
                    message: "Error with Password",
                    status: 404,
                });
            }
        }
        else {
            return res.status(404).json({
                message: "Error with email",
                status: 404,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Couldnt login user",
            status: 404,
        });
    }
});
exports.loginUser = loginUser;
const readoneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        return res.status(200).json({
            message: "user found",
            status: 200,
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error finding user",
            status: 404,
        });
    }
});
exports.readoneUser = readoneUser;
const readAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.find();
        return res.status(200).json({
            message: "users read sucessfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error finding users",
            status: 404,
        });
    }
});
exports.readAllUsers = readAllUsers;
