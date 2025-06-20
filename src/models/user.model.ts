import { Model, model, Schema } from "mongoose";
import {
  IAddress,
  IUser,
  IUserMethods,
  UserModelType,
} from "../interfaces/user.interface";
import bcrypt from "bcrypt";
const addressSchema = new Schema<IAddress>(
  {
    city: {
      type: String,
      required: true,
      trim: true,
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    zip: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  }
);
const userSchema = new Schema<IUser, UserModelType>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    address: {
      type: addressSchema,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.static("hashedPassword", async function hashedPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
});
userSchema.pre("save", async function (next) {
  console.log(this)
})
const User = model<IUser, UserModelType>("User", userSchema);
export default User;
