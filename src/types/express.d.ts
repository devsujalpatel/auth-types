import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      sessionId: string;
      userId: string;
      name: string;
      email: string;
    };
  }
}
