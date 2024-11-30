import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String, // Store time as a string (HH:MM:SS) 
        required: true
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Canceled'],
        default: 'Scheduled',
        required: true
    },
    type: {
        type: String,
        enum: ['Meeting', 'In-Person', 'Checkup', 'Emergency'],
        required: true
    },
}, {
    timestamps: true, // This will add `createdAt` and `updatedAt` fields automatically
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
