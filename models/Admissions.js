import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', default: null },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    admissionDate: { type: Date, default: Date.now },
    dischargeDate: { type: Date, default: null },
    admissionStatus: {
        type: String,
        enum: ['Active', 'Discharged', 'Transferred', 'Pending'],
        default: 'Active',
        required: true,
    },
    notes: { type: String, default: '' },
}, { timestamps: true });

const Admission = mongoose.model('Admission', admissionSchema);

export default Admission;
