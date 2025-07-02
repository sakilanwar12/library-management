import { Model } from "mongoose";

export enum EGenre {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  SCIENCE = "SCIENCE",
  HISTORY = "HISTORY",
  BIOGRAPHY = "BIOGRAPHY",
  FANTASY = "FANTASY",
}

export type TGenre = `${EGenre}`;

export interface IBook {
  title: string;
  author: string;
  genre: TGenre;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}

export interface IBookDocument extends IBook, Document {
  updateAvailability(): void;
}
export interface IBookModel extends Model<IBookDocument> {}
