import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

export const sessionMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const tokenHeader = req.headers["authorization"];

  if (!tokenHeader) {
    return next();
  }

  if (!tokenHeader.startsWith("Bearer ")) {
    return res.status(400).json({ error: "Token must start with Bearer" });
  }

  const token = tokenHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as string | JwtPayload;

    if (decoded) {
      req.user = decoded; // now types line up
    }
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  next();
};
