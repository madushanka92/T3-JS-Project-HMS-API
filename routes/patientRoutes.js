import express from 'express';
import {
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
} from '../controllers/patientController.js';
import logRequest from '../middlewares/logRequest.js';

const router = express.Router();

// CRUD routes for Patient
router.get('/',logRequest, getAllPatients);          // GET all patients
router.get('/:id', logRequest, getPatientById);       // GET a patient by ID
router.post('/', logRequest, createPatient);          // POST a new patient
router.put('/:id', logRequest, updatePatient);        // PUT (update) a patient
router.delete('/:id', logRequest, deletePatient);     // DELETE a patient

export default router;