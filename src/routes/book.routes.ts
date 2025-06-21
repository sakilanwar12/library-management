import { Router } from "express";
import { createBook, getBooks } from "../controllers/book.controller";
const bookRouter = Router();

bookRouter.post("/", createBook);
bookRouter.get("/", getBooks);

export default bookRouter;
