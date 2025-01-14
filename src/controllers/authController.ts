import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/User";
import { ILoginCredentials } from "../auth/types";
import Project from "../model/Project";

const JWT_SECRET = process.env.JWT_SECRET || "key";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, email, _id } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      res.status(400).json({ message: "Username or email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      _id,
      username,
      password: hashedPassword,
      email,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully", userId: user._id,username:user.username  });
  } catch (error) {
      console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password }: ILoginCredentials = req.body;

    const user = await User.findOne({ username });
    console.log(user);
    
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    // const userId= user.id;
  

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ userId: user._id,username,token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};