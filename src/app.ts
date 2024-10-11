import express from "express";
import cors from "cors";
import "./config/mongodb";

import authRoutes from "./routes/authRoutes";
import projectRoutes from "./routes/projectRoutes";


const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const port = 5000;

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});


app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);