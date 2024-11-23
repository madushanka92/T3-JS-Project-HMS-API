import mongoose from 'mongoose';

const nurseDoctorAssignmentSchema = new mongoose.Schema({
    nurseUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to User collection (nurse)
        required: true
    },
    doctorUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to User collection (doctor)
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
    shiftType: {
        type: String,
        enum: ['Morning', 'Afternoon', 'Night', 'All Day'],
        required: true
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

const NurseDoctorAssignment = mongoose.model('NurseDoctorAssignment', nurseDoctorAssignmentSchema);

export default NurseDoctorAssignment;
