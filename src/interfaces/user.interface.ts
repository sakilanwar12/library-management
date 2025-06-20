import { Model } from "mongoose";

export interface IAddress {
  city: string;
  street: string;
  zip: string;
}
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "admin";
  address: IAddress;
}

export interface IUserMethods {
  hashedPassword(name: string): Promise<string>;
}

export interface UserModelType extends Model<IUser> {
  hashedPassword(password: string): Promise<string>;
}