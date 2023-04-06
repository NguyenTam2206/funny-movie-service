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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../middlewares/auth"));
const Movie_1 = __importDefault(require("../models/Movie"));
router.post("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    const username = res.locals.username;
    const errors = [];
    if (!url)
        errors.push({ msg: "url is required" });
    if (errors.length > 0)
        return res.json({ code: 0, data: errors });
    else {
        const movieData = { url, createdBy: username };
        console.log({ movieData });
        const movie = new Movie_1.default(movieData);
        yield movie.save();
        return res.json({ code: 1, msg: "Movie has shared." });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield Movie_1.default.find({});
    return res.json({ code: 1, data: movies });
}));
exports.default = router;
//# sourceMappingURL=movies.js.map