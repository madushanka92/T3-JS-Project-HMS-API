import Feature from "../models/Feature.js";

// Create a new feature
export const createFeature = async (req, res) => {
    try {
        const { featureName, description, isActive } = req.body;
        const feature = new Feature({ featureName, description, isActive });
        await feature.save();
        res.status(201).json(feature);
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
        const feature = await Feature.findByIdAndDelete(req.params.id);
        if (!feature) return res.status(404).json({ message: "Feature not found" });
        res.json({ message: "Feature deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
