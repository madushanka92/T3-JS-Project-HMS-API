import express from 'express';
import {
    createFeatureMapping,
    getAllFeatureMappings,
    getFeatureMappingById,
    updateFeatureMapping,
    deleteFeatureMapping,
} from '../controllers/featureMappingController.js';
import logRequest from '../middlewares/logRequest.js';

const router = express.Router();

// Define routes for Feature Mapping
router.post('/', logRequest,  createFeatureMapping);
router.get('/', logRequest, getAllFeatureMappings);
router.get('/:id', logRequest, getFeatureMappingById);
router.put('/:id', logRequest, updateFeatureMapping);
router.delete('/:id', logRequest, deleteFeatureMapping);

export default router;
