import express from 'express';
import {
    createFeature,
    getAllFeatures,
    getFeatureById,
    updateFeature,
    deleteFeature,
} from '../controllers/featureController.js';
import logRequest from '../middlewares/logRequest.js';

const router = express.Router();

// Define routes for Feature
router.post('/', logRequest, createFeature);
router.get('/', logRequest, getAllFeatures);
router.get('/:id', logRequest, getFeatureById);
router.put('/:id', logRequest, updateFeature);
router.delete('/:id', logRequest, deleteFeature);

export default router;
