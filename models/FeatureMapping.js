import mongoose from 'mongoose';

const featureMappingSchema = new mongoose.Schema({
    featureId: { type: mongoose.Schema.Types.ObjectId, ref: "Feature", required: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: "UserRole", required: true },
    canCreate: { type: Boolean, default: false },
    canRead: { type: Boolean, default: true },
    canUpdate: { type: Boolean, default: false },
    canDelete: { type: Boolean, default: false },
});

const FeatureMapping = mongoose.model('FeatureMapping', featureMappingSchema);

export default FeatureMapping;