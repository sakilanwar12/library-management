import { z } from "zod";
import { EGenre } from "../interfaces/book.interface";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.nativeEnum(EGenre, {
    errorMap: () => ({ message: "Genre is required" }),
  }),
  isbn: z.string().min(10, "ISBN must be at least 10 characters"),
  description: z.string().optional(),
  copies: z.number().int().min(1, "Copies must be at least 1"),
  available: z.boolean().optional(),
});

export type TBook = z.infer<typeof bookSchema>;

export const updateBookSchema = bookSchema.partial();
