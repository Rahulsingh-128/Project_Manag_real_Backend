import { Document } from "mongoose";

export interface IUser extends Document {
  _id: number;
  username: string;
  password: string;
  email: string;
}

export interface ILoginCredentials {
  username: string;
  password: string;
}
