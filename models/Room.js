import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true, unique: true },
    roomType: {
        type: String,
        enum: ['ICU', 'General', 'VIP'],
        required: true
    },
    availabilityStatus: {
        type: String,
        enum: ['Available', 'Occupied', 'Maintenance'],
        default: 'Available'
    },
    assignedPatientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', default: null },
    floorNumber: { type: Number, required: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null },
    lastCleanedAt: { type: Date },
    dailyRate: { type: Number, default: 0.00, min: 0 },
}, { timestamps: true }); // Add createdAt and updatedAt fields automatically

const Room = mongoose.model('Room', roomSchema);

export default Room;