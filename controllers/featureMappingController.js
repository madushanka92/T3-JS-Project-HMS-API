import FeatureMapping from "../models/FeatureMapping.js";

// Create a new feature mapping
export const createFeatureMapping = async (req, res) => {
    try {
        const { featureId, roleId, canCreate, canRead, canUpdate, canDelete } = req.body;
        const mapping = new FeatureMapping({ featureId, roleId, canCreate, canRead, canUpdate, canDelete });
        await mapping.save();
        res.status(201).json(mapping);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all feature mappings
export const getAllFeatureMappings = async (req, res) => {
    try {
        const mappings = await FeatureMapping.find().populate("featureId roleId");
        res.json(mappings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a feature mapping by ID
export const getFeatureMappingById = async (req, res) => {
    try {
        const mapping = await FeatureMapping.findById(req.params.id).populate("featureId roleId");
        if (!mapping) return res.status(404).json({ message: "Mapping not found" });
        res.json(mapping);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a feature mapping by ID
export const updateFeatureMapping = async (req, res) => {
    try {
        const mapping = await FeatureMapping.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate(
            "featureId roleId"
        );
        if (!mapping) return res.status(404).json({ message: "Mapping not found" });
        res.json(mapping);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a feature mapping by ID
export const deleteFeatureMapping = async (req, res) => {
    try {
        const mapping = await FeatureMapping.findByIdAndDelete(req.params.id);
        if (!mapping) return res.status(404).json({ message: "Mapping not found" });
        res.json({ message: "Mapping deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
