import { Request, Response } from "express";
import Project, { IProject } from "../model/Project";
import dayjs from "dayjs";
import User from "../model/User";
import { ObjectId } from "mongoose";

// interface AuthReq extends Request {
//   user: {
//       id: ObjectId;
//   }
// }

interface IAddProject {
  _id: number;
  Project_Name: string;
  Details: string;
  Demo_Link: string;
  Github_repository: string;
  userId:Number;
  updatedAt:string;
  createdAt:string;
}

export const addProject = async (req: Request, res: Response) => {
  const project = req.body;
  const {_id,Project_Name, Details, Demo_Link, Github_repository, userId } = project;
  try {
    const user = await User.findById(userId);
    
    if (!user) {
    console.log("user not found");
    
    }
    const newProject = new Project({ 
      _id,
      Project_Name,
      Details,
      Demo_Link,
      Github_repository,
      created_by:user?._id,  // Reference the user's _id
      createdAt:new Date().getTime()
    })
    
    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ message: "Error adding project" });
  }
}

export const getAllProjects = async (req: Request, res: Response): Promise<void>=>{
  //console.log("in getall method...");
  
    try {
      const projects = await Project.find({}).populate('created_by', 'username').exec();
      // Format the createdAt and updatedAt fields using dayjs
  const formattedProjects = projects.map((project) => ({
    ...project.toObject(),  // Convert Mongoose document to plain object
    createdAt: dayjs(project.createdAt).format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: dayjs(project.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
  }));
  
      res.status(200).send(formattedProjects)
    //   const formattedData = projects.map(project => ({
    //     _id: project._id.toString(), // Convert ObjectId to string
    //     name: item.name
    // }));
    } catch (error) {
      res.status(500).json({ message: "Error fetching projects" });
     
    }
}


export const getProjectsByUserId = async (req: Request, res: Response)=>{
  console.log("in userid method");
  
  const userId= req.params._id;
  console.log("id",userId);
  
  const projects= await Project.find({created_by: userId});
  console.log("projects", projects);
  console.log("id",userId);
  res.json(projects);
}

export const getProjectById = async (req: Request, res: Response) => {
    const projectId = req.params._id; // Use _id directly as a string
    try {
      const project = await Project.findById(projectId);
      if (!project) {
        res.status(404).json({ message: "Project not found" });
        return;
      }
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: "Error fetching project" });
    }
  };


  export const updateProject = async (req: Request, res: Response) => {
    const projectId = req.params._id; // Use _id directly as a string
    try {
      const updatedProject = await Project.findByIdAndUpdate(projectId, req.body, {
        new: true,
      });
      if (!updatedProject) {
        res.status(404).json({ message: "Project not found" });
        return;
      }
      res.json(updatedProject);
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ message: "Error updating project" });
    }
  };
  
  export const deleteProjectById = async (req: Request, res: Response) => {
    const projectId = req.params._id; // Use _id directly as a string
    try {
      const deletedProject = await Project.findByIdAndDelete(projectId);
      if (!deletedProject) {
        res.status(404).json({ message: "Project not found" });
        return;
      }
      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting project" });
    }
  };
  