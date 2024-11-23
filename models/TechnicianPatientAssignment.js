import mongoose from 'mongoose';

const technicianPatientAssignmentSchema = new mongoose.Schema({
    technicianUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User collection (technician)
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',  // Reference to the Patient collection
        required: true
    },
    assignedDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    serviceType: {
        type: String,
        enum: ['Lab', 'Radiology', 'Cardiology', 'Neurology', 'Respiratory'],
        required: true
    },
    status: {
        type: String,
        enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Scheduled'
    },
    scheduledDateTime: {
        type: Date,
        required: true
    },
    completedDateTime: {
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

const TechnicianPatientAssignment = mongoose.model('TechnicianPatientAssignment', technicianPatientAssignmentSchema);

export default TechnicianPatientAssignment;
