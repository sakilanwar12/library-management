import { Request, Response, Router } from "express";
import { createBorrow } from "../controllers/borrow.controller";

const borrowRouter = Router();

borrowRouter.post("/", createBorrow as (req: Request, res: Response) => void);

export default borrowRouter;
