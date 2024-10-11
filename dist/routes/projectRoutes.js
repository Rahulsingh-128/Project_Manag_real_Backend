"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const projectController_1 = require("../controllers/projectController");
const router = express_1.default.Router();
router.post('/add', auth_1.authenticateToken, projectController_1.addProject);
router.get('/getall', auth_1.authenticateToken, projectController_1.getAllProjects);
router.get('/get/:_id', auth_1.authenticateToken, projectController_1.getProjectById);
router.put('/update/:_id', auth_1.authenticateToken, projectController_1.updateProject);
router.delete('/delete/:_id', auth_1.authenticateToken, projectController_1.deleteProjectById);
router.get('/getbyuserid/:_id', auth_1.authenticateToken, projectController_1.getProjectsByUserId);
exports.default = router;
