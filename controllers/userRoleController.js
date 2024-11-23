import User from "../models/User.js"
import UserRole from '../models/UserRole.js';

// Create a new role
export const createRole = async (req, res) => {
    try {
        const { roleName } = req.body;
        const role = new UserRole({ roleName });
        await role.save();
        res.status(201).json(role);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all roles
export const getAllRoles = async (req, res) => {
    try {
        const roles = await UserRole.find();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a role by ID
export const getRoleById = async (req, res) => {
    try {
        const role = await UserRole.findById(req.params.id);
        if (!role) return res.status(404).json({ message: 'Role not found' });
        res.json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a role by ID
export const updateRole = async (req, res) => {
    try {
        const role = await UserRole.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!role) return res.status(404).json({ message: 'Role not found' });
        res.json(role);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a role by ID
export const deleteRole = async (req, res) => {
    try {
        const roleId = req.params.id;

        // Check if the role is being used by any user
        const usersWithRole = await User.countDocuments({ roleId: roleId });

        if (usersWithRole > 0) {
            return res.status(400).json({ message: "Cannot delete role, it is currently assigned to users." });
        }

        // If not in use, proceed with deleting the role
        const role = await UserRole.findByIdAndDelete(roleId);
        if (!role) return res.status(404).json({ message: "Role not found" });

        res.json({ message: "Role deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
