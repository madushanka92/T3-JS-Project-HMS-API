import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
    featureName: { type: String, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Feature = mongoose.model('Feature', featureSchema);

export default Feature;