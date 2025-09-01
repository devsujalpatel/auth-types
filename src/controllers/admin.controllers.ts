import { Request, Response } from "express";
import db from "../db/index.ts";
import { usersTable } from "../db/schema.ts";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
    }).from(usersTable);
    return res.status(200).json({ users });
  } catch (error) {}
};


