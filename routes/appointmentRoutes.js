import express from 'express';
import {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment, updateAppointmentStatus, getAppointmentsByPatientId, getScheduledAppointmentsByPatient
} from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/', createAppointment); // Create a new appointment
router.get('/', getAllAppointments); // Get all appointments
router.get('/:id', getAppointmentById); // Get appointment by ID
router.put('/:id', updateAppointment); // Update appointment by ID
router.delete('/:id', deleteAppointment); // Delete appointment by ID
router.put('/:id/status', updateAppointmentStatus);
router.get('/patient/:patientId', getAppointmentsByPatientId);
router.get('/scheduled/:patientId', getScheduledAppointmentsByPatient);

export default router;