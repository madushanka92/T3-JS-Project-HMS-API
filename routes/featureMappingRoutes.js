import express from 'express';
import {
    createFeatureMapping,
    getAllFeatureMappings,
    getFeatureMappingById,
    updateFeatureMapping,
    deleteFeatureMapping,
} from '../controllers/featureMappingController.js';

const router = express.Router();

// Define routes for Feature Mapping
router.post('/', createFeatureMapping);
router.get('/', getAllFeatureMappings);
router.get('/:id', getFeatureMappingById);
router.put('/:id', updateFeatureMapping);
router.delete('/:id', deleteFeatureMapping);

export default router;
