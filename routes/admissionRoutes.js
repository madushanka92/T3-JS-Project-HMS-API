import express from 'express';
import {
    getAllAdmissions,
    createAdmission,
    getAdmissionById,
    updateAdmission,
    deleteAdmission,
} from '../controllers/admissionController.js';

const router = express.Router();

router.get('/', getAllAdmissions);
router.post('/', createAdmission);
router.get('/:id', getAdmissionById);
router.put('/:id', updateAdmission);
router.delete('/:id', deleteAdmission);

export default router;
