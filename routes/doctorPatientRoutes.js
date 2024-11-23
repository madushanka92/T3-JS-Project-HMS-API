import express from 'express';
import { createAssignment, getAllAssignments, getAssignmentById, updateAssignment, deleteAssignment } from '../controllers/doctorPatientController.js';

const router = express.Router();

router.post('/assignments', createAssignment);
router.get('/assignments', getAllAssignments);
router.get('/assignments/:id', getAssignmentById);
router.put('/assignments/:id', updateAssignment);
router.delete('/assignments/:id', deleteAssignment);

export default router;