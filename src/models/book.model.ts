// models/book.model.ts
import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    isbn: { type: String, required: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
