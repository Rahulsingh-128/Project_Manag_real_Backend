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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("./config/mongodb");
const AuthAPI_1 = require("./auth/AuthAPI");
const auth_1 = require("./middleware/auth");
const ProjectAPI_1 = require("./apis/ProjectAPI");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
const port = 5000;
app.listen(port, () => {
    console.log(`server started at port ${port}`);
});
app.get("/", (req, res) => {
    res.send("Hello world");
});
app.post("/auth/register", AuthAPI_1.register);
app.post("/auth/login", AuthAPI_1.login);
app.post("/projects/add", auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, ProjectAPI_1.addProject)(req.body);
    res.send(data);
}));
app.get("/projects/getall", auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside getall");
    const data = yield (0, ProjectAPI_1.getAllProjects)();
    console.log("getall data", data);
    res.send(data);
}));
app.get("/projects/get/:_id", auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = Number(req.params._id);
    const data = yield (0, ProjectAPI_1.getProjectById)(projectId);
    res.send(data);
}));
app.put("/projects/update/:_id", auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { _id } = _a, project = __rest(_a, ["_id"]);
    const projectId = Number(req.params._id);
    const data = yield (0, ProjectAPI_1.updateProject)(projectId, project);
    res.send(data);
}));
app.delete("/projects/delete/:_id", auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = Number(req.params._id);
    const data = yield (0, ProjectAPI_1.deleteProjectById)(projectId);
    res.send(data);
}));
