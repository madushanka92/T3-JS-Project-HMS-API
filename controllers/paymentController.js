import Payment from '../models/Payment.js';
import Billing from '../models/Billing.js';
import Patient from '../models/Patient.js';

export const createPayment = async (req, res) => {
    try {
        const {
            billId,
            patientId,
            paymentMethod,
            amountPaid,
            paymentDate,
            transactionReference,
            paymentStatus,
            remarks
        } = req.body;

        // Find the corresponding billing document
        const billing = await Billing.findById(billId);
        if (!billing) {
            return res.status(404).json({ message: 'Billing record not found' });
        }

        // Check if the patient exists
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient record not found' });
        }

        // Calculate the total paid so far from the payments table
        const payments = await Payment.find({ billId, paymentStatus: 'Success' });
        const totalPaidSoFar = payments.reduce((sum, payment) => sum + payment.amountPaid, 0);

        // Convert Decimal128 fields to numbers for calculation
        const totalAmount = parseFloat(billing.totalAmount.toString());
        const remainingAmount = totalAmount - totalPaidSoFar;

        // Check if the payment exceeds the remaining balance
        if (amountPaid > remainingAmount) {
            return res.status(400).json({ message: 'Payment amount cannot exceed the remaining balance' });
        }

        // Create the payment document
        const payment = new Payment({
            billId,
            patientId,
            paymentMethod,
            amountPaid,
            paymentDate,
            transactionReference,
            paymentStatus,
            remarks
        });

        // Save the payment
        await payment.save();

        // Update payment status in the billing document
        if (amountPaid >= remainingAmount) {
            billing.paymentStatus = 'Paid';
        } else if (amountPaid > 0) {
            billing.paymentStatus = 'Partially Paid';
        } else {
            billing.paymentStatus = 'Unpaid';
        }

        // Save the updated billing document
        await billing.save();

        res.status(201).json(payment); // Return the created payment
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};


export const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate('billId') // Populate the related Billing document
            .populate('patientId'); // Populate the related Patient document

        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate('billId') // Populate related Billing document
            .populate('patientId'); // Populate related Patient document

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPaymentsByBillId = async (req, res) => {
    try {
        const payments = await Payment.find({ billId: req.params.id })
            .populate('billId') // Populate related Billing document
            .populate('patientId'); // Populate related Patient document

        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPaymentsByPatientId = async (req, res) => {
    try {
        const payments = await Payment.find({ patientId: req.params.id })
            .populate('billId') // Populate related Billing document
            .populate('patientId'); // Populate related Patient document

        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePaymentStatus = async (req, res) => {
    try {
        const { paymentStatus, remarks } = req.body;

        // Find the payment by ID
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Update payment status and remarks
        payment.paymentStatus = paymentStatus || payment.paymentStatus;
        payment.remarks = remarks || payment.remarks;

        await payment.save();

        res.json(payment);  // Return the updated payment
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPaymentsByStatus = async (req, res) => {
    try {
        const payments = await Payment.find({ paymentStatus: req.params.status })
            .populate('billId') // Populate related Billing document
            .populate('patientId'); // Populate related Patient document

        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
