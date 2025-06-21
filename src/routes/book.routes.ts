import { Router } from "express";
import {
  createBook,
  deleteABookById,
  getBookById,
  getBooks,
  updateABookById,
} from "../controllers/book.controller";
const bookRouter = Router();

bookRouter.post("/", createBook);
bookRouter.get("/", getBooks);
bookRouter.get("/:bookId", getBookById);
bookRouter.patch("/:bookId", updateABookById);
bookRouter.delete("/:bookId", deleteABookById);

export default bookRouter;
