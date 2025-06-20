import express, { Application } from "express";
import notesRouter from "./controllers/notes.controller";
import { userRouter } from "./controllers/user.controller";

const app: Application = express();
app.use(express.json());

app.use("/notes", notesRouter);
app.use("/user", userRouter);

export default app;
