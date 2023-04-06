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
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const errors = [];
    if (!username)
        errors.push({ msg: "username is required." });
    if (!password)
        errors.push({ msg: "password is required." });
    if (errors.length > 0)
        return res.json(errors);
    else {
        const u = yield User_1.default.findOne({ username });
        if (u) {
            return res.json({ code: 0, msg: "Username has been registered!" });
        }
        const hasPassword = yield bcrypt_1.default.hash(password, Number(process.env.SALT_ROUNDS));
        const userData = { username, password: hasPassword };
        const user = new User_1.default(userData);
        yield user.save();
        return res.json({ code: 1, msg: "Register success." });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ username });
        if (!user)
            return res.json({ code: 0, msg: "Username or password is invalid." });
        const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword)
            return res.json({ code: 0, msg: "Username or password is invalid." });
        // Create JWT
        const accessToken = jsonwebtoken_1.default.sign({ username }, process.env.ACCESS_TOKEN_SECRET || "", {
            expiresIn: "24h",
        });
        return res.json({
            code: 1,
            data: { accessToken },
        });
    }
    catch (error) {
        console.log(error);
        return res.json({ code: 0, msg: "Can not login" });
    }
}));
exports.default = router;
//# sourceMappingURL=auth.js.map