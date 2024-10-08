import express from "express";
import cors from "cors";
import "./config/mongodb";
import { register, login } from "./auth/AuthAPI";
import { authenticateToken, AuthRequest } from "./middleware/auth";
import {addProject, deleteProjectById, getAllProjects, getProjectById, updateProject} from "./apis/ProjectAPI";

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

app.post("/auth/register", register);
app.post("/auth/login", login);

app.post("/projects/add", authenticateToken, async (req: AuthRequest, res) => {
  const data = await addProject(req.body);
  res.send(data);
});

app.get("/projects/getall", authenticateToken, async (req: AuthRequest, res) => {
  console.log("inside getall");
  
  const data = await getAllProjects();
  console.log("getall data",data);
  
  res.send(data);
});

app.get("/projects/get/:_id", authenticateToken, async (req: AuthRequest, res) => {
  const projectId = Number(req.params._id);
  const data = await getProjectById(projectId);
  res.send(data);
});

app.put(
  "/projects/update/:_id",
  authenticateToken,
  async (req: AuthRequest, res) => {
    const { _id, ...project } = req.body;
    const projectId = Number(req.params._id);
    const data = await updateProject(projectId, project);
    res.send(data);
  }
);

app.delete(
  "/projects/delete/:_id",
  authenticateToken,
  async (req: AuthRequest, res) => {
    const projectId = Number(req.params._id);
    const data = await deleteProjectById(projectId);
    res.send(data);
  }
);
