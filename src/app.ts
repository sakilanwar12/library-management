import express, { Application } from "express";

import bookRouter from "./controllers/book.controller";
import borrowRouter from "./controllers/borrow.controller";

const app: Application = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowRouter);
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});
export default app;
