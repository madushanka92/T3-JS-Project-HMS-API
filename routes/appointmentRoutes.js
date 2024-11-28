import express from 'express';
import {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
} from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/', createAppointment); // Create a new appointment
router.get('/', getAllAppointments); // Get all appointments
router.get('/:id', getAppointmentById); // Get appointment by ID
router.put('/:id', updateAppointment); // Update appointment by ID
router.delete('/:id', deleteAppointment); // Delete appointment by ID

export default router;
