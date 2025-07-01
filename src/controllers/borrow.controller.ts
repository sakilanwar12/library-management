import { Request, Response, Router } from "express";
import Book from "../models/book.model";
import Borrow from "../models/borrow.model";
import { borrowSchema } from "../schemas/borrowSchema";
import { apiResponse } from "../lib/apiResponse";
import { ZodError } from "zod";
import mongoose from "mongoose";
const borrowRouter = Router();

// borrowRouter.post("/", async (req: Request, res: Response) => {
//   try {
//     const data = await borrowSchema.parseAsync(req.body);

//     // Validate ObjectId
//     if (!mongoose.Types.ObjectId.isValid(data.book)) {
//       return res
//         .status(400)
//         .json(
//           apiResponse(false, "Invalid book ID", `Invalid ID: ${data.book}`)
//         );
//     }

//     const book = await Book.findById(data.book);
//     if (!book) {
//       return res.status(404).json(apiResponse(false, "Book not found", null));
//     }

//     if (book.copies < data.quantity) {
//       return res
//         .status(400)
//         .json(apiResponse(false, "Not enough copies available", null));
//     }

//     // Deduct copies
//     book.copies -= data.quantity;
//     book.updateAvailability();
//     await book.save();

//     const borrow = new Borrow({
//       book: data.book,
//       quantity: data.quantity,
//       dueDate: data.dueDate,
//     });

//     const savedBorrow = await borrow.save();

//     return res
//       .status(201)
//       .json(apiResponse(true, "Book borrowed successfully", savedBorrow));
//   } catch (error) {
//     if (error instanceof ZodError) {
//       return res.status(400).json(
//         apiResponse(false, "Validation failed", {
//           name: error.name,
//           errors: error.flatten().fieldErrors,
//         })
//       );
//     }

//     return res
//       .status(500)
//       .json(
//         apiResponse(false, "Internal Server Error", (error as Error).message)
//       );
//   }
// });
borrowRouter.get("/", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books", // collection name (lowercase plural)
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res
      .status(200)
      .json(
        apiResponse(
          true,
          "Borrowed books summary retrieved successfully",
          summary
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(
        apiResponse(false, "Internal Server Error", (error as Error).message)
      );
  }
});

export default borrowRouter;
