import User from '../models/User.js';

// Get all users 
export const getAllUsers = async (req, res) => {
    try {
        const { role } = req.query;

        // First, find users without applying filters yet
        let users = await User.find()
            .populate('roleId')  // Populate roleId field to include the role document
            .populate('departmentId');  // Optionally populate departmentId if needed

        // If a role is provided, filter the users after population
        if (role != undefined) {
            users = users.filter(user => user.roleId?.roleName === role);
        }

        if (!users.length) {
            return res.status(404).json({ message: role ? `No users found with role: ${role}` : 'No users found' });
        }

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Create a new user
export const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('roleId').populate('departmentId');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user by ID
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
