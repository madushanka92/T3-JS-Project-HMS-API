import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    departmentName: { type: String, required: true },
    headOfDepartmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Reference to the User model
});

const Department = mongoose.model('Department', departmentSchema);

export default Department;
