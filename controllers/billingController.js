import Billing from '../models/Billing.js';

// Create a new billing record
export const createBilling = async (req, res) => {
    try {
        const { patientId, appointmentId, totalAmount, paymentStatus, paymentDate } = req.body;
        const billing = new Billing({ patientId, appointmentId, totalAmount, paymentStatus, paymentDate });
        await billing.save();
        res.status(201).json(billing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all billing records
export const getAllBillings = async (req, res) => {
    try {
        const billings = await Billing.find().populate('patientId').populate('appointmentId');
        res.json(billings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a billing record by ID
export const getBillingById = async (req, res) => {
    try {
        const billing = await Billing.findById(req.params.id).populate('patientId').populate('appointmentId');
        if (!billing) return res.status(404).json({ message: 'Billing record not found' });
        res.json(billing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a billing record by ID
export const updateBilling = async (req, res) => {
    try {
        const billing = await Billing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!billing) return res.status(404).json({ message: 'Billing record not found' });
        res.json(billing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a billing record by ID
export const deleteBilling = async (req, res) => {
    try {
        const billing = await Billing.findByIdAndDelete(req.params.id);
        if (!billing) return res.status(404).json({ message: 'Billing record not found' });
        res.json({ message: 'Billing record deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
