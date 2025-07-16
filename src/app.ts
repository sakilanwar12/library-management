// src/app.ts
import express, { Application } from "express";
import cors from "cors";
import bookRouter from "./controllers/book.controller";
import borrowRouter from "./controllers/borrow.controller";

const app: Application = express();

app.use(cors({
  origin: 'https://library-management-frontend-bay.vercel.app', 
}));

app.use(express.json());

app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowRouter);

// ✅ Catch-all 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

export default app;
