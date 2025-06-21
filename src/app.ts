import express, { Application } from "express";
import notesRouter from "./controllers/notes.controller";
import { userRouter } from "./controllers/user.controller";
import bookRouter from "./routes/book.routes";

const app: Application = express();
app.use(express.json());

app.use("/notes", notesRouter);
app.use("/user", userRouter);
app.use("/api/books", bookRouter);

export default app;
