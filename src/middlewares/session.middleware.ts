import { NextFunction, Request, Response } from "express";
import { userSession, usersTable } from "../db/schema.ts";
import db from "../db/index.ts";
import { eq } from "drizzle-orm";

export interface CustomRequest extends Request {
  user?: {
    sessionId: string;
    userId: string;
    name: string;
    email: string;
  };
}

export const sessionMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const sessionId = req.headers["session-id"];
  if (!sessionId || Array.isArray(sessionId)) {
    return next();
  }

  const [data] = await db
    .select({
      sessionId: userSession.id,
      userId: userSession.userId,
      name: usersTable.name,
      email: usersTable.email,
    })
    .from(userSession)
    .rightJoin(usersTable, eq(usersTable.id, userSession.userId))
    .where(eq(userSession.id, sessionId));

  if (!data) {
    return next();
  }

  if (!data.userId || !data.sessionId) {
    return next();
  }

  req.user = {
    sessionId: data.sessionId,
    userId: data.userId,
    name: data.name,
    email: data.email,
  };

  next();
};
