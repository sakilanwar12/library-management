import { Request, Response, Router } from "express";
import {
  createBorrow,
  getBorrowedBooksSummary,
} from "../controllers/borrow.controller";

const borrowRouter = Router();

borrowRouter.post("/", createBorrow as (req: Request, res: Response) => void);
borrowRouter.get("/", getBorrowedBooksSummary);

export default borrowRouter;
