import NurseDoctorAssignment from "../models/NurseDoctorAssignment.js";
import User from "../models/User.js";

// Create a new Nurse-Doctor Assignment
export const createNurseDoctorAssignment = async (req, res) => {
    try {
        const { nurseUserId, doctorUserId, shiftType, status, notes } = req.body;

        // Ensure both nurse and doctor exist in the system
        const nurse = await User.findById(nurseUserId);
        const doctor = await User.findById(doctorUserId);

        if (!nurse || !doctor) {
            return res.status(404).json({ message: "Nurse or Doctor not found" });
        }

        // Create the assignment
        const assignment = new NurseDoctorAssignment({
            nurseUserId,
            doctorUserId,
            shiftType,
            status,
            notes,
        });

        await assignment.save();
        res.status(201).json(assignment); // Return the created assignment
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Nurse-Doctor Assignments
export const getAllAssignments = async (req, res) => {
    try {
        const assignments = await NurseDoctorAssignment.find()
            .populate("nurseUserId", "firstName lastName") // Populate nurse details
            .populate("doctorUserId", "firstName lastName"); // Populate doctor details
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Nurse-Doctor Assignment
export const deleteNurseDoctorAssignment = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the assignment
        const assignment = await NurseDoctorAssignment.findByIdAndDelete(id);

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        res.json({ message: "Assignment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
