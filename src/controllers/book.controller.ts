import express, { Request, Response } from "express";
import Book from "../models/book.model";
import { bookSchema } from "../schemas/bookSchema";
import { apiResponse } from "../lib/apiResponse";
import { ZodError } from "zod";

export const bookRouter = express.Router();

export const createBook = async (req: Request, res: Response) => {
  try {
    const body = await bookSchema.parseAsync(req.body);

    const book = new Book(body);
    const savedBook = await book.save();

    res
      .status(201)
      .json(apiResponse(true, "Book created successfully", savedBook));
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(
        apiResponse(false, "Validation failed", {
          name: error.name,
          errors: error.flatten().fieldErrors,
        })
      );
    }
    res
      .status(500)
      .json(
        apiResponse(false, "Internal Server Error", (error as Error).message)
      );
  }
};
