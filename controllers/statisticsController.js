import User from '../models/User.js';
import Patient from '../models/Patient.js';
import Admission from '../models/Admissions.js';

export const getTotalCounts = async (req, res) => {
    try {
        // Count the number of doctors
        const doctorRole = await User.aggregate([
            { $lookup: { from: 'userroles', localField: 'roleId', foreignField: '_id', as: 'role' } },
            { $unwind: '$role' },
            { $match: { 'role.roleName': 'Doctor' } },
            { $count: 'doctorCount' }
        ]);

        // Count the number of nurses
        const nurseRole = await User.aggregate([
            { $lookup: { from: 'userroles', localField: 'roleId', foreignField: '_id', as: 'role' } },
            { $unwind: '$role' },
            { $match: { 'role.roleName': 'Nurse' } },
            { $count: 'nurseCount' }
        ]);

        // Count the number of Technician
        const techRole = await User.aggregate([
            { $lookup: { from: 'userroles', localField: 'roleId', foreignField: '_id', as: 'role' } },
            { $unwind: '$role' },
            { $match: { 'role.roleName': 'Technician' } },
            { $count: 'techCount' }
        ]);

        // Count the number of patients
        const patientCount = await Patient.countDocuments();

        const admissionsCount = await Admission.countDocuments();

        // Prepare response data
        const response = {
            doctors: doctorRole[0] ? doctorRole[0].doctorCount : 0,
            nurses: nurseRole[0] ? nurseRole[0].nurseCount : 0,
            technicians: techRole[0] ? techRole[0].techCount : 0,
            patients: patientCount,
            admissions: admissionsCount
        };

        res.json(response);
    } catch (error) {
        console.error("Error fetching total counts:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
