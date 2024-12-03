import Appointment from '../models/Appointment.js';

// Create a new appointment
export const createAppointment = async (req, res) => {
    try {
        const { patientId, doctorId, departmentId, appointmentDate, appointmentTime, status, type } = req.body;
        const appointment = new Appointment({ patientId, doctorId, departmentId, appointmentDate, appointmentTime, status, type });
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all appointments
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('patientId')
            .populate('doctorId')
            .populate('departmentId');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an appointment by ID
export const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('patientId')
            .populate('doctorId')
            .populate('departmentId');
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an appointment by ID
export const updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an appointment by ID
export const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.json({ message: 'Appointment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update the status of an appointment
export const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body; // Get the new status from the request body

        // Ensure the status is valid
        if (!['Scheduled', 'Completed', 'Canceled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true } // Return the updated appointment
        );

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAppointmentsByPatientId = async (req, res) => {
    try {
        const patientId = req.params?.id; // Get patientId from the URL parameter
        const appointments = await Appointment.find({ patientId })
            .populate('patientId')
            .populate('doctorId')
            .populate('departmentId');

        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for this patient' });
        }

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get appointments by patientId with status 'Scheduled'
export const getScheduledAppointmentsByPatient = async (req, res) => {
    try {
        const patientId = req.params?.id; // Get the patientId from the request params
        const appointments = await Appointment.find({
            patientId,
            status: 'Scheduled'  // Filter appointments by patientId and status 'Scheduled'
        })
            .populate('patientId')
            .populate('doctorId')
            .populate('departmentId');

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: 'No scheduled appointments found for this patient.' });
        }

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


