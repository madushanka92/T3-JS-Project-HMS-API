import express from 'express';
import {
    createBilling,
    getAllBillings,
    getBillingById,
    updateBilling,
    deleteBilling
} from '../controllers/billingController.js';
import logRequest from '../middlewares/logRequest.js';

const router = express.Router();

router.post('/', logRequest, createBilling); // Create a new billing record
router.get('/', logRequest, getAllBillings); // Get all billing records
router.get('/:id', logRequest, getBillingById); // Get billing record by ID
router.put('/:id', logRequest, updateBilling); // Update billing record by ID
router.delete('/:id', logRequest, deleteBilling); // Delete billing record by ID

export default router;