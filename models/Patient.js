import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    contactNumber: { type: String },
    email: { type: String },
    address: { type: String },
    emergencyContact: { type: String },
    medicalHistory: { type: String },
}, { timestamps: true }); // Add createdAt and updatedAt fields automatically

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;