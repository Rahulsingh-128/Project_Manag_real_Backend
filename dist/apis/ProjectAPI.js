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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProject = addProject;
exports.getAllProjects = getAllProjects;
exports.getProjectById = getProjectById;
exports.updateProject = updateProject;
exports.deleteProjectById = deleteProjectById;
const Project_1 = __importDefault(require("../model/Project"));
const User_1 = __importDefault(require("../model/User"));
const dayjs_1 = __importDefault(require("dayjs"));
function addProject(project) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("project", project);
        try {
            const { _id, Project_Name, Details, Demo_Link, Github_repository, userId } = project;
            // Find the user by userId
            const user = yield User_1.default.findById(userId);
            if (!user) {
                window.alert('User not found');
            }
            const projectDoc = new Project_1.default({
                _id,
                Project_Name,
                Details,
                Demo_Link,
                Github_repository,
                created_by: user === null || user === void 0 ? void 0 : user._id, // Reference the user's _id
                createdAt: new Date().getTime()
            });
            return yield projectDoc.save();
        }
        catch (error) {
            console.error("Error adding project:", error);
            return null; // Return null in case of error
        }
    });
}
function getAllProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        const projects = yield Project_1.default.find({}).populate('created_by', 'username').exec();
        // Format the createdAt and updatedAt fields using dayjs
        const formattedProjects = projects.map((project) => (Object.assign(Object.assign({}, project.toObject()), { createdAt: (0, dayjs_1.default)(project.createdAt).format('YYYY-MM-DD HH:mm:ss'), updatedAt: (0, dayjs_1.default)(project.updatedAt).format('YYYY-MM-DD HH:mm:ss') })));
        return formattedProjects;
    });
}
function getProjectById(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Project_1.default.findById(_id).populate('created_by', 'username').exec();
    });
}
function updateProject(_id, project) {
    return __awaiter(this, void 0, void 0, function* () {
        const filter = { _id: _id };
        const { _id: removeId } = project, updates = __rest(project, ["_id"]);
        const result = yield Project_1.default.updateOne(filter, updates);
        return result;
    });
}
function deleteProjectById(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Project_1.default.deleteOne({ _id: _id });
    });
}
