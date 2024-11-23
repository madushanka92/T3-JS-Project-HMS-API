import Feature from "../models/Feature.js";
import FeatureMapping from "../models/FeatureMapping.js";
import UserRole from "../models/UserRole.js";

// Create a new feature
export const createFeature = async (req, res) => {
    try {
        const { featureName, description, isActive } = req.body;

        const feature = new Feature({ featureName, description, isActive });
        await feature.save();

        const adminRole = await UserRole.findOne({ roleName: "Admin" });
        if (!adminRole) {
            return res.status(404).json({ message: "Admin role not found." });
        }

        const featureMapping = new FeatureMapping({
            featureId: feature._id,
            roleId: adminRole._id,
            canCreate: true,
            canRead: true,
            canUpdate: true,
            canDelete: true,
        });

        await featureMapping.save();

        res.status(201).json({
            feature,
            featureMapping,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all features
export const getAllFeatures = async (req, res) => {
    try {
        const features = await Feature.find();
        res.json(features);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a feature by ID
export const getFeatureById = async (req, res) => {
    try {
        const feature = await Feature.findById(req.params.id);
        if (!feature) return res.status(404).json({ message: "Feature not found" });
        res.json(feature);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a feature by ID
export const updateFeature = async (req, res) => {
    try {
        const feature = await Feature.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!feature) return res.status(404).json({ message: "Feature not found" });
        res.json(feature);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a feature by ID
export const deleteFeature = async (req, res) => {
    try {
        // Check if the feature is used in any FeatureMapping
        const featureMapping = await FeatureMapping.findOne({ featureId: req.params.id });

        if (featureMapping) {
            return res.status(400).json({
                message: "Cannot delete feature because it is being used in feature mappings."
            });
        }

        // If not used, proceed to delete the feature
        const feature = await Feature.findByIdAndDelete(req.params.id);
        if (!feature) return res.status(404).json({ message: "Feature not found" });

        res.json({ message: "Feature deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
