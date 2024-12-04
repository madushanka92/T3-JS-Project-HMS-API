import Admission from '../models/Admissions.js';
import Room from '../models/Room.js';

// Get all admissions
export const getAllAdmissions = async (req, res) => {
    try {
        const admissions = await Admission.find()
            .populate('patientId')
            .populate('roomId')
            .populate('departmentId');
        res.json(admissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new admission
export const createAdmission = async (req, res) => {
    try {
        // Create a new admission
        const admission = new Admission(req.body);

        // Save the admission
        await admission.save();

        // Find the room associated with the admission
        const room = await Room.findById(admission.roomId);

        // If a room is associated with the admission, update its status to 'Occupied'
        if (room) {
            room.availabilityStatus = 'Occupied';
            await room.save();
        }

        // Respond with the newly created admission
        res.status(201).json(admission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single admission by ID
export const getAdmissionById = async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.id)
            .populate('patientId')
            .populate('roomId')
            .populate('departmentId');
        if (!admission) return res.status(404).json({ message: 'Admission not found' });
        res.json(admission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an admission by ID
export const updateAdmission = async (req, res) => {
    try {
        const admission = await Admission.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!admission) return res.status(404).json({ message: 'Admission not found' });
        res.json(admission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an admission by ID
export const deleteAdmission = async (req, res) => {
    try {
        const admission = await Admission.findByIdAndDelete(req.params.id);
        if (!admission) return res.status(404).json({ message: 'Admission not found' });
        res.json({ message: 'Admission deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
