"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.sendStatus(401);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET || "");
        console.log(decoded);
        if ("username" in decoded) {
            res.locals.username = decoded.username;
            next();
        }
        else {
            throw new Error("Invalid JWT payload");
        }
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.js.map