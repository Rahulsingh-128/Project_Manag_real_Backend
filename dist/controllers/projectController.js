"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProjectById = exports.updateProject = exports.getProjectById = exports.getProjectsByUserId = exports.getAllProjects = exports.addProject = void 0;
const Project_1 = __importDefault(require("../model/Project"));
const dayjs_1 = __importDefault(require("dayjs"));
const User_1 = __importDefault(require("../model/User"));
const addProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = req.body;
    const { _id, Project_Name, Details, Demo_Link, Github_repository, userId } = project;
    try {
        const user = yield User_1.default.findById(userId);
        if (!user) {
            console.log("user not found");
        }
        const newProject = new Project_1.default({
            _id,
            Project_Name,
            Details,
            Demo_Link,
            Github_repository,
            created_by: user === null || user === void 0 ? void 0 : user._id, // Reference the user's _id
            createdAt: new Date().getTime()
        });
        yield newProject.save();
        res.status(201).json(newProject);
    }
    catch (error) {
        console.error("Error adding project:", error);
        res.status(500).json({ message: "Error adding project" });
    }
});
exports.addProject = addProject;
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log("in getall method...");
    try {
        const projects = yield Project_1.default.find({}).populate('created_by', 'username').exec();
        // Format the createdAt and updatedAt fields using dayjs
        const formattedProjects = projects.map((project) => (Object.assign(Object.assign({}, project.toObject()), { createdAt: (0, dayjs_1.default)(project.createdAt).format('YYYY-MM-DD HH:mm:ss'), updatedAt: (0, dayjs_1.default)(project.updatedAt).format('YYYY-MM-DD HH:mm:ss') })));
        res.status(200).send(formattedProjects);
        //   const formattedData = projects.map(project => ({
        //     _id: project._id.toString(), // Convert ObjectId to string
        //     name: item.name
        // }));
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching projects" });
    }
});
exports.getAllProjects = getAllProjects;
const getProjectsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in userid method");
    const userId = req.params._id;
    console.log("id", userId);
    const projects = yield Project_1.default.find({ created_by: userId });
    console.log("projects", projects);
    console.log("id", userId);
    res.json(projects);
});
exports.getProjectsByUserId = getProjectsByUserId;
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params._id; // Use _id directly as a string
    try {
        const project = yield Project_1.default.findById(projectId);
        if (!project) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching project" });
    }
});
exports.getProjectById = getProjectById;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params._id; // Use _id directly as a string
    try {
        const updatedProject = yield Project_1.default.findByIdAndUpdate(projectId, req.body, {
            new: true,
        });
        if (!updatedProject) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
        res.json(updatedProject);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating project" });
    }
});
exports.updateProject = updateProject;
const deleteProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params._id; // Use _id directly as a string
    try {
        const deletedProject = yield Project_1.default.findByIdAndDelete(projectId);
        if (!deletedProject) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
        res.json({ message: "Project deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting project" });
    }
});
exports.deleteProjectById = deleteProjectById;
