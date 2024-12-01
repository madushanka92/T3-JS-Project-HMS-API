import express from 'express';
import {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
} from '../controllers/departmentController.js';

const router = express.Router();

// Define routes for Department
router.post('/', createDepartment);           // POST /api/departments
router.get('/', getAllDepartments);           // GET /api/departments
router.get('/:id', getDepartmentById);        // GET /api/departments/:id
router.put('/:id', updateDepartment);         // PUT /api/departments/:id
router.delete('/:id', deleteDepartment);      // DELETE /api/departments/:id

export default router;