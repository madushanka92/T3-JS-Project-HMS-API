import express from 'express';
import { createNurseDoctorAssignment, deleteNurseDoctorAssignment, getAllAssignments } from "../controllers/nurseDoctorController.js";
import logRequest from '../middlewares/logRequest.js';

const router = express.Router();

router.post('/assignments', logRequest, createNurseDoctorAssignment);
router.get('/assignments', logRequest, getAllAssignments);
router.delete('/assignments/:id', logRequest, deleteNurseDoctorAssignment);

export default router;
