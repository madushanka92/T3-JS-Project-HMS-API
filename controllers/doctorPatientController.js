import DoctorPatientAssignment from "../models/DoctorPatientAssignment.js";
import User from "../models/User.js";
import Patient from "../models/Patient.js";

// Create a new assignment
export const createAssignment = async (req, res) => {
    try {
        const { doctorUserId, patientId, primaryDoctor, notes, status } = req.body;

        // Validate if the doctor and patient exist
        const doctor = await User.findById(doctorUserId);
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        const patient = await Patient.findById(patientId);
        if (!patient) return res.status(404).json({ message: "Patient not found" });

        // Create the assignment
        const newAssignment = new DoctorPatientAssignment({
            doctorUserId,
            patientId,
            primaryDoctor,
            notes,
            status,
        });

        await newAssignment.save();
        res.status(201).json(newAssignment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all assignments
export const getAllAssignments = async (req, res) => {
    try {
        const assignments = await DoctorPatientAssignment.find()
            .populate("doctorUserId", "firstName lastName email") // Populating doctor details
            .populate("patientId", "firstName lastName")
            .exec();
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get assignment by ID
export const getAssignmentById = async (req, res) => {
    try {
        const assignment = await DoctorPatientAssignment.findById(req.params.id)
            .populate("doctorUserId", "firstName lastName email")
            .populate("patientId", "firstName lastName")
            .exec();
        if (!assignment) return res.status(404).json({ message: "Assignment not found" });
        res.json(assignment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update assignment by ID
export const updateAssignment = async (req, res) => {
    try {
        const { doctorUserId, patientId, primaryDoctor, notes, status } = req.body;

        // Validate if doctor and patient exist
        const doctor = await User.findById(doctorUserId);
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        const patient = await Patient.findById(patientId);
        if (!patient) return res.status(404).json({ message: "Patient not found" });

        const updatedAssignment = await DoctorPatientAssignment.findByIdAndUpdate(
            req.params.id,
            { doctorUserId, patientId, primaryDoctor, notes, status, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedAssignment) return res.status(404).json({ message: "Assignment not found" });

        res.json(updatedAssignment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete assignment by ID
export const deleteAssignment = async (req, res) => {
    try {
        const assignment = await DoctorPatientAssignment.findByIdAndDelete(req.params.id);
        if (!assignment) return res.status(404).json({ message: "Assignment not found" });
        res.json({ message: "Assignment deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
