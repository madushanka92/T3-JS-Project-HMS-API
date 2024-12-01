import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    billId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Billing', // Reference to the Billing model
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient', // Reference to the Patient model
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Cash', 'Insurance', 'Debit Card', 'Bank Transfer'],
        required: true
    },
    amountPaid: {
        type: Number,
        required: true,
        min: 0, // Enforcing that the amount must be greater than 0
    },
    paymentDate: {
        type: Date,
        required: true,
        default: Date.now, // Automatically set to current date
    },
    transactionReference: {
        type: String,
        maxlength: 100, // Limiting the length to match your VARCHAR(100)
        default: null,
    },
    paymentStatus: {
        type: String,
        enum: ['Success', 'Failed', 'Pending'],
        required: true,
        default: 'Success',
    },
    remarks: {
        type: String,
        default: null,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Indexes to optimize queries, similar to SQL indexes
paymentSchema.index({ billId: 1 });
paymentSchema.index({ patientId: 1 });
paymentSchema.index({ paymentDate: 1 });
paymentSchema.index({ paymentStatus: 1 });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
