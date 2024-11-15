import Patient from '../models/Patient.js';

// Get all patients
export const getAllPatients = async (req, res) => {
    try {
        // query parameters  & default values
        const page = parseInt(req.query.pageNumber) || 1;
        const limit = parseInt(req.query.pageSize) || 10;
        const searchQuery = req.query.search || "";

        // skip value based on the page and the limit
        const skip = (page - 1) * limit;

        const filter = searchQuery
            ? {
                $or: [
                    { firstName: { $regex: searchQuery, $options: "i" } },
                    { lastName: { $regex: searchQuery, $options: "i" } },
                    { contactNumber: { $regex: searchQuery, $options: "i" } }
                ]
            }
            : {};

        // get all the patients with pagination and filter (search)
        const patients = await Patient.find(filter)
            .skip(skip)
            .limit(limit);

        // the total count of patients for pagination and filter (search)
        const totalPatients = await Patient.countDocuments(filter);

        // Return patients
        res.status(200).json({
            patients,
            totalPatients,
            totalPages: Math.ceil(totalPatients / limit),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get a single patient by ID
export const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new patient
export const createPatient = async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        const savedPatient = await newPatient.save();
        res.status(201).json(savedPatient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a patient by ID
export const updatePatient = async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPatient) return res.status(404).json({ message: 'Patient not found' });
        res.status(200).json(updatedPatient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a patient by ID
export const deletePatient = async (req, res) => {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
        if (!deletedPatient) return res.status(404).json({ message: 'Patient not found' });
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};