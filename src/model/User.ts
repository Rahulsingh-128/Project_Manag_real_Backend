import mongoose, { Schema } from "mongoose";
import { IUser } from "../auth/types";

const userSchema: Schema<IUser> = new Schema({
  _id: { type: Number, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
