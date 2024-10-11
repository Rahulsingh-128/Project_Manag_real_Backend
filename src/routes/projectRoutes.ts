import express from 'express'
import { authenticateToken } from '../middleware/auth';
import { addProject, 
    deleteProjectById, 
    getAllProjects, 
    getProjectById,
    getProjectsByUserId,
    updateProject }
    from '../controllers/projectController';



const router = express.Router();

router.post('/add', authenticateToken, addProject);
router.get('/getall', authenticateToken, getAllProjects);
router.get('/get/:_id', authenticateToken, getProjectById);
router.put('/update/:_id', authenticateToken, updateProject);
router.delete('/delete/:_id', authenticateToken, deleteProjectById);
router.get('/getbyuserid/:_id', authenticateToken, getProjectsByUserId)

export default router;