import TechnicianDepartmentAssignment from "../models/TechnicianDepartmentAssignment.js";
import User from "../models/User.js";
import Department from "../models/Department.js";

// Create a new Technician-Department Assignment
export const createTechnicianDepartmentAssignment = async (req, res) => {
    try {
        const { technicianUserId, departmentId, workShift, status, startDate, endDate, notes } = req.body;

        // Ensure both technician and department exist in the system
        const technician = await User.findById(technicianUserId);
        const department = await Department.findById(departmentId);

        if (!technician || !department) {
            return res.status(404).json({ message: "Technician or Department not found" });
        }

        // Create the assignment
        const assignment = new TechnicianDepartmentAssignment({
            technicianUserId,
            departmentId,
            workShift,
            status,
            startDate,
            endDate,
            notes,
        });

        await assignment.save();
        res.status(201).json(assignment); // Return the created assignment
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Technician-Department Assignments
export const getAllAssignments = async (req, res) => {
    try {
        const assignments = await TechnicianDepartmentAssignment.find()
            .populate("technicianUserId", "firstName lastName") // Populate technician details
            .populate("departmentId", "departmentName"); // Populate department details
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Technician-Department Assignment
export const deleteTechnicianDepartmentAssignment = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the assignment
        const assignment = await TechnicianDepartmentAssignment.findByIdAndDelete(id);

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        res.json({ message: "Assignment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
