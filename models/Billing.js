import mongoose from 'mongoose';

const billingSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    totalAmount: {
        type: mongoose.Decimal128,
        required: true,
        default: 0.00,
        min: 0
    },
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Unpaid'],
        required: true,
        default: 'Unpaid'
    },
    paymentDate: {
        type: Date,
        default: null
    },
}, {
    timestamps: true, // This will add `createdAt` and `updatedAt` fields automatically
});

const Billing = mongoose.model('Billing', billingSchema);

export default Billing;
