import mongoose from 'mongoose';

const assignmentStatus = ['Active', 'Inactive', 'Transferred'];

const doctorPatientAssignmentSchema = new mongoose.Schema(
    {
        doctorUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
        assignedDate: { type: Date, default: Date.now },
        status: { type: String, enum: assignmentStatus, default: 'Active' },
        primaryDoctor: { type: Boolean, default: true },
        notes: { type: String },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

// Add a unique index for patientId, primaryDoctor, and status as per SQL schema
doctorPatientAssignmentSchema.index({ patientId: 1, primaryDoctor: 1, status: 1 }, { unique: true });

const DoctorPatientAssignment = mongoose.model('DoctorPatientAssignment', doctorPatientAssignmentSchema);

export default DoctorPatientAssignment;
