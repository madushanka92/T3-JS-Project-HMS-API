import TechnicianPatientAssignment from "../models/TechnicianPatientAssignment.js";
import User from "../models/User.js";
import Patient from "../models/Patient.js";

// Create a new Technician-Patient Assignment
export const createTechnicianPatientAssignment = async (req, res) => {
    try {
        const { technicianUserId, patientId, serviceType, status, scheduledDateTime, completedDateTime, notes } = req.body;

        // Ensure both technician and patient exist in the system
        const technician = await User.findById(technicianUserId);
        const patient = await Patient.findById(patientId);

        if (!technician || !patient) {
            return res.status(404).json({ message: "Technician or Patient not found" });
        }

        // Create the assignment
        const assignment = new TechnicianPatientAssignment({
            technicianUserId,
            patientId,
            serviceType,
            status,
            scheduledDateTime,
            completedDateTime,
            notes,
        });

        await assignment.save();
        res.status(201).json(assignment);  // Return the created assignment
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Technician-Patient Assignments
export const getAllAssignments = async (req, res) => {
    try {
        const assignments = await TechnicianPatientAssignment.find()
            .populate("technicianUserId", "firstName lastName") // Populate technician details
            .populate("patientId", "firstName lastName"); // Populate patient details
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Technician-Patient Assignment
export const deleteTechnicianPatientAssignment = async (req, res) => {
    try {
        const { id } = req.params;

        const assignment = await TechnicianPatientAssignment.findById(id);

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        await assignment.deleteOne();
        res.status(200).json({ message: "Assignment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
