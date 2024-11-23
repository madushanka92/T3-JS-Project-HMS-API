import mongoose from 'mongoose';

const technicianDepartmentAssignmentSchema = new mongoose.Schema({
    technicianUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to User collection (technician)
        required: true
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',  // Reference to Department collection
        required: true
    },
    assignedDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Temporary', 'On Leave'],
        default: 'Active'
    },
    workShift: {
        type: String,
        enum: ['Morning', 'Afternoon', 'Night', 'Rotational'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    notes: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

const TechnicianDepartmentAssignment = mongoose.model('TechnicianDepartmentAssignment', technicianDepartmentAssignmentSchema);

export default TechnicianDepartmentAssignment;
