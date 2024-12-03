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
import logRequest from '../middlewares/logRequest.js';

const router = express.Router();

// Payment Routes
router.post('/', logRequest, createPayment); // Create a new payment
router.get('/', logRequest, getAllPayments); // Get all payments
router.get('/:id', logRequest, getPaymentById); // Get payment by ID
router.get('/bill/:id', logRequest, getPaymentsByBillId); // Get payments by Bill ID
router.get('/patient/:id', logRequest, getPaymentsByPatientId); // Get payments by Patient ID
router.put('/:id/status', logRequest, updatePaymentStatus); // Update payment status
router.delete('/:id', logRequest, deletePayment); // Delete payment by ID
router.get('/status/:status', logRequest, getPaymentsByStatus); // Get payments by status

export default router;
