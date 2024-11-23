import express from 'express';
import { createNurseDoctorAssignment, deleteNurseDoctorAssignment, getAllAssignments } from "../controllers/nurseDoctorController.js";

const router = express.Router();

router.post('/assignments', createNurseDoctorAssignment);
router.get('/assignments', getAllAssignments);
router.delete('/assignments/:id', deleteNurseDoctorAssignment);

export default router;
