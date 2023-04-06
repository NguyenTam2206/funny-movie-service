"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const movieSchema = new Schema({
    url: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model("movie", movieSchema);
//# sourceMappingURL=Movie.js.map