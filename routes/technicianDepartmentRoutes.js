import express from 'express';
import { createTechnicianDepartmentAssignment, deleteTechnicianDepartmentAssignment, getAllAssignments } from "../controllers/technicianDepartmentController.js";

const router = express.Router();

router.post("/assignments", createTechnicianDepartmentAssignment);
router.get("/assignments", getAllAssignments);
router.delete("/assignments/:id", deleteTechnicianDepartmentAssignment);

export default router;
