import express from 'express';
import {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
} from '../controllers/userRoleController.js';
import logRequest from '../middlewares/logRequest.js';

const router = express.Router();

// Define routes for UserRole
router.post('/', logRequest, createRole);           // POST /api/roles
router.get('/', logRequest, getAllRoles);           // GET /api/roles
router.get('/:id', logRequest, getRoleById);        // GET /api/roles/:id
router.put('/:id', logRequest, updateRole);         // PUT /api/roles/:id
router.delete('/:id', logRequest, deleteRole);      // DELETE /api/roles/:id

export default router;
