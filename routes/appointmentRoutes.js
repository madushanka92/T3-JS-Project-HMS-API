import express from 'express';
import {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment, updateAppointmentStatus, getAppointmentsByPatientId, getScheduledAppointmentsByPatient
} from '../controllers/appointmentController.js';
import logRequest from '../middlewares/logRequest.js';

const router = express.Router();

router.post('/', logRequest, createAppointment); // Create a new appointment
router.get('/', logRequest, getAllAppointments); // Get all appointments
router.get('/:id', logRequest, getAppointmentById); // Get appointment by ID
router.put('/:id', logRequest, updateAppointment); // Update appointment by ID
router.delete('/:id', logRequest, deleteAppointment); // Delete appointment by ID
router.put('/:id/status', logRequest, updateAppointmentStatus);
router.get('/patient/:id', logRequest, getAppointmentsByPatientId);
router.get('/scheduled/:id', logRequest, getScheduledAppointmentsByPatient);

export default router;