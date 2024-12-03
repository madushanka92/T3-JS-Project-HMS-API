import express from 'express';
import { createTechnicianPatientAssignment, deleteTechnicianPatientAssignment, getAllAssignments } from "../controllers/technicianPatientController.js";
import logRequest from '../middlewares/logRequest.js';

const router = express.Router();

router.post('/assignments', logRequest, createTechnicianPatientAssignment);
router.get('/assignments', logRequest, getAllAssignments);
router.delete("/assignments/:id", logRequest, deleteTechnicianPatientAssignment);

export default router;
