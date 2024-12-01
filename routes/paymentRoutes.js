import express from 'express';
import {
    createPayment,
    getAllPayments,
    getPaymentById,
    getPaymentsByBillId,
    getPaymentsByPatientId,
    updatePaymentStatus,
    deletePayment,
    getPaymentsByStatus
} from '../controllers/paymentController.js';

const router = express.Router();

// Payment Routes
router.post('/', createPayment); // Create a new payment
router.get('/', getAllPayments); // Get all payments
router.get('/:id', getPaymentById); // Get payment by ID
router.get('/bill/:billId', getPaymentsByBillId); // Get payments by Bill ID
router.get('/patient/:patientId', getPaymentsByPatientId); // Get payments by Patient ID
router.put('/:id/status', updatePaymentStatus); // Update payment status
router.delete('/:id', deletePayment); // Delete payment by ID
router.get('/status/:status', getPaymentsByStatus); // Get payments by status

export default router;
