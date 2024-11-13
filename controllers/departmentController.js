import Department from '../models/Department.js';

// Create a new department
export const createDepartment = async (req, res) => {
    try {
        const { departmentName, headOfDepartmentId } = req.body;
        const department = new Department({ departmentName, headOfDepartmentId });
        await department.save();
        res.status(201).json(department);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all departments
export const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find().populate('headOfDepartmentId', 'firstName lastName'); // Populate headOfDepartmentId
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a department by ID
export const getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id).populate('headOfDepartmentId', 'firstName lastName');
        if (!department) return res.status(404).json({ message: 'Department not found' });
        res.json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a department by ID
export const updateDepartment = async (req, res) => {
    try {
        const { departmentName, headOfDepartmentId } = req.body;
        const department = await Department.findByIdAndUpdate(
            req.params.id,
            { departmentName, headOfDepartmentId },
            { new: true }
        );
        if (!department) return res.status(404).json({ message: 'Department not found' });
        res.json(department);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a department by ID
export const deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findByIdAndDelete(req.params.id);
        if (!department) return res.status(404).json({ message: 'Department not found' });
        res.json({ message: 'Department deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
