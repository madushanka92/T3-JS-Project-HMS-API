import express from 'express';
import {
    getAllAdmissions,
    createAdmission,
    getAdmissionById,
    updateAdmission,
    deleteAdmission,
} from '../controllers/admissionController.js';

import logRequest from "../middlewares/logRequest.js";

const router = express.Router();

router.get('/', logRequest, getAllAdmissions);
router.post('/', logRequest, createAdmission);
router.get('/:id', logRequest, getAdmissionById);
router.put('/:id', logRequest, updateAdmission);
router.delete('/:id', logRequest, deleteAdmission);

export default router;
