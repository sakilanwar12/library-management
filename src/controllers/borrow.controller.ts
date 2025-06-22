import { Request, Response } from "express";
import Book from "../models/book.model";
import Borrow from "../models/borrow.model";
import { borrowSchema } from "../schemas/borrowSchema";
import { apiResponse } from "../lib/apiResponse";
import { ZodError } from "zod";
import mongoose from "mongoose";

export const createBorrow = async (req: Request, res: Response) => {
  try {
    const data = await borrowSchema.parseAsync(req.body);

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(data.book)) {
      res
        .status(400)
        .json(
          apiResponse(false, "Invalid book ID", `Invalid ID: ${data.book}`)
        );
    }

    const book = await Book.findById(data.book);
    if (!book) {
      res.status(404).json(apiResponse(false, "Book not found", null));
      return;
    }

    if (book.copies < data.quantity) {
      res
        .status(400)
        .json(apiResponse(false, "Not enough copies available", null));
    }

    // Deduct copies
    book.copies -= data.quantity;
    book.updateAvailability();
    await book.save();

    const borrow = new Borrow({
      book: data.book,
      quantity: data.quantity,
      dueDate: data.dueDate,
    });

    const savedBorrow = await borrow.save();

    res
      .status(201)
      .json(apiResponse(true, "Book borrowed successfully", savedBorrow));
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


export const getBorrowedBooksSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" }
        }
      },
      {
        $lookup: {
          from: "books", // collection name (lowercase plural)
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails"
        }
      },
      {
        $unwind: "$bookDetails"
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn"
          },
          totalQuantity: 1
        }
      }
    ]);

    res.status(200).json(
      apiResponse(true, "Borrowed books summary retrieved successfully", summary)
    );
  } catch (error) {
    res
      .status(500)
      .json(apiResponse(false, "Internal Server Error", (error as Error).message));
  }
};