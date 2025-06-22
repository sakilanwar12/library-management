import { z } from "zod";

export const borrowSchema = z.object({
  book: z.string().min(1),
  quantity: z.number().int().positive(),
  dueDate: z.coerce.date(),
});

export type TBorrow = z.infer<typeof borrowSchema>;