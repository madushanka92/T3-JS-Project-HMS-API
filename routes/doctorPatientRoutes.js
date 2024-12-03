import express from 'express';
import { createAssignment, getAllAssignments, getAssignmentById, updateAssignment, deleteAssignment } from '../controllers/doctorPatientController.js';
import logRequest from '../middlewares/logRequest.js';

const router = express.Router();

router.post('/assignments', logRequest, createAssignment);
router.get('/assignments', logRequest, getAllAssignments);
router.get('/assignments/:id', logRequest, getAssignmentById);
router.put('/assignments/:id', logRequest, updateAssignment);
router.delete('/assignments/:id', logRequest, deleteAssignment);

export default router;