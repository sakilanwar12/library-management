// models/book.model.ts
import mongoose, { Schema } from "mongoose";
import { IBookDocument, IBookModel } from "../interfaces/book.interface";

const bookSchema = new Schema<IBookDocument, IBookModel>(
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
bookSchema.methods.updateAvailability = function () {
  if (this.copies <= 0) {
    this.available = false;
  } else {
    this.available = true;
  }
};

const Book = mongoose.model<IBookDocument, IBookModel>("Book", bookSchema);

export default Book;
