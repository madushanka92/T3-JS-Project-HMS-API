import express from 'express';
import {
    createBilling,
    getAllBillings,
    getBillingById,
    updateBilling,
    deleteBilling
} from '../controllers/billingController.js';

const router = express.Router();

router.post('/', createBilling); // Create a new billing record
router.get('/', getAllBillings); // Get all billing records
router.get('/:id', getBillingById); // Get billing record by ID
router.put('/:id', updateBilling); // Update billing record by ID
router.delete('/:id', deleteBilling); // Delete billing record by ID

export default router;
