"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model("user", userSchema);
//# sourceMappingURL=User.js.map