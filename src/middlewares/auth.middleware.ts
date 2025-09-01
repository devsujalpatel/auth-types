import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Define the payload shape you expect in the token
interface AuthPayload extends JwtPayload {
  id: string;
  email: string;
  role: string; // 👈 add role
}

export interface CustomRequest extends Request {
  user?: AuthPayload;
}

export const authMiddleware = async (
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;

    if (decoded) {
      req.user = decoded;
    }
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  next();
};

export const ensureAuthenticated = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ error: "You are not authenticated" });
  }
  next();
};

export const restrictToRole = (role: string) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "You are not authenticated" });
    }

    if (req.user.role !== role) {
      return res.status(401).json({ error: "You are not authorized to access this route" });
    }

    next();
  };
};
