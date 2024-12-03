import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },  // User who performed the action
    actionType: {
        type: String,
        enum: ['Create', 'Update', 'Delete'],
        required: true,
    },
    entityType: {
        type: String,
        enum: ['Admission', 'Appointment', 'Billing',
            'Department', 'DoctorPatientAssignment',
            'Feature', 'FeatureMapping',
            'NurseDoctorAssignment', 'Patient',
            'Payment', 'Room',
            'TechnicianDepartmentAssignment',
            'TechnicianPatientAssignment',
            'User',
            'UserRole',
        ],
        required: true,
    },
    entityId: { type: mongoose.Schema.Types.ObjectId },  // ID of the entity being acted upon
    timestamp: { type: Date, default: Date.now },  // Log timestamp
    details: { type: mongoose.Schema.Types.Mixed },  // JSON field for additional details
});

// Create indexes for efficient querying
logSchema.index({ userId: 1, actionType: 1 });
logSchema.index({ entityType: 1, entityId: 1 });
logSchema.index({ timestamp: 1 });

const Log = mongoose.model('Log', logSchema);

export default Log;
