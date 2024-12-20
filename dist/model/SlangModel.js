"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SlangModel = new mongoose_1.Schema({
    word: {
        type: String,
    },
    meaning: {
        type: String,
    },
    userID: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("slangs", SlangModel);
