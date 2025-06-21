import express, { Request, Response } from "express";
import Book from "../models/book.model";
import { bookSchema } from "../schemas/bookSchema";
import { apiResponse } from "../lib/apiResponse";
import { ZodError } from "zod";
import { getLimit, getSort } from "../lib/utils";

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
      res.status(400).json(
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
export const getBooks = async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "asc",
      limit = "10",
    } = req.query;

    const query: Record<string, any> = {};

    // If genre filter provided
    if (filter) {
      query.genre = filter;
    }

    const parsedLimit = getLimit(limit, 5);
    const sortObject = getSort(sortBy, sort);

    const books = await Book.find(query).sort(sortObject).limit(parsedLimit);

    res
      .status(200)
      .json(apiResponse(true, "Books fetched successfully", books));
  } catch (error) {
    res
      .status(500)
      .json(
        apiResponse(false, "Internal Server Error", (error as Error).message)
      );
  }
};
