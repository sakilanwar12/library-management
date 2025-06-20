import express, { Request, Response } from "express";
import User from "../models/user.model";
import { z } from "zod";
import bcrypt from "bcrypt";
export const userRouter = express.Router();

const createUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.enum(["user", "admin"]),
  address: z.object({
    city: z.string(),
    street: z.string(),
    zip: z.string(),
  }),
});

userRouter.post("/create-user", async (req: Request, res: Response) => {
  try {
    const body = await createUserZodSchema.parseAsync(req.body);
    const hashedPassword = await User.hashedPassword(body.password);
    const user = new User({
      ...body,
      password: hashedPassword,
    });

    const users = await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error,
    });
  }
});
