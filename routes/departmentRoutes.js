import express from 'express';
import {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
} from '../controllers/departmentController.js';
import logRequest from '../middlewares/logRequest.js';

const router = express.Router();

// Define routes for Department
router.post('/', logRequest, createDepartment);           // POST /api/departments
router.get('/', logRequest, getAllDepartments);           // GET /api/departments
router.get('/:id', logRequest, getDepartmentById);        // GET /api/departments/:id
router.put('/:id', logRequest, updateDepartment);         // PUT /api/departments/:id
router.delete('/:id', logRequest, deleteDepartment);      // DELETE /api/departments/:id

export default router;