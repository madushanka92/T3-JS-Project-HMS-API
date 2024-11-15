import express from 'express';
import {
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
} from '../controllers/patientController.js';

const router = express.Router();

// CRUD routes for Patient
router.get('/', getAllPatients);          // GET all patients
router.get('/:id', getPatientById);       // GET a patient by ID
router.post('/', createPatient);          // POST a new patient
router.put('/:id', updatePatient);        // PUT (update) a patient
router.delete('/:id', deletePatient);     // DELETE a patient

export default router;