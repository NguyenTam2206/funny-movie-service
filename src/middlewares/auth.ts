import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || ""
    ) as JwtPayload;
    console.log(decoded);

    if ("username" in decoded) {
      res.locals.username = decoded.username;
      next();
    } else {
      throw new Error("Invalid JWT payload");
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};

export default authMiddleware;
