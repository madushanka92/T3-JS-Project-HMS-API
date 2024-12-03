import express from 'express';
import { createTechnicianDepartmentAssignment, deleteTechnicianDepartmentAssignment, getAllAssignments } from "../controllers/technicianDepartmentController.js";
import logRequest from '../middlewares/logRequest.js';

const router = express.Router();

router.post("/assignments", logRequest, createTechnicianDepartmentAssignment);
router.get("/assignments", logRequest, getAllAssignments);
router.delete("/assignments/:id", logRequest, deleteTechnicianDepartmentAssignment);

export default router;
