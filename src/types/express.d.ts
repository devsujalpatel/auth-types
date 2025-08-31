import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      userId: string;
      name: string;
      email: string;
    };
  }
}
