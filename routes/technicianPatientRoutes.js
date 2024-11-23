import express from 'express';
import { createTechnicianPatientAssignment, deleteTechnicianPatientAssignment, getAllAssignments } from "../controllers/technicianPatientController.js";

const router = express.Router();

router.post('/assignments', createTechnicianPatientAssignment);
router.get('/assignments', getAllAssignments);
router.delete("/assignments/:id", deleteTechnicianPatientAssignment);

export default router;
