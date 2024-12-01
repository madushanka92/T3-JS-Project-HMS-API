import Appointment from '../models/Appointment.js';
import Billing from '../models/Billing.js';
import Payment from '../models/Payment.js';

// Create a new billing record
export const createBilling = async (req, res) => {
    try {
        const { patientId, appointmentId, totalAmount, paymentStatus, paymentDate } = req.body;

        // Create a new billing record
        const billing = new Billing({ patientId, appointmentId, totalAmount, paymentStatus, paymentDate });
        await billing.save();

        // Update the status of the related appointment to 'Completed'
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status: 'Completed' },
            { new: true } // Return the updated appointment document
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Respond with the created billing and updated appointment
        res.status(201).json({
            message: 'Billing created and appointment status updated to Completed',
            billing,
            updatedAppointment,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all billing records
export const getAllBillings = async (req, res) => {
    try {
        // Fetch billings and populate patient and appointment details
        const billings = await Billing.find()
            .populate('patientId')
            .populate('appointmentId');

        // Prepare an array to store the enriched billing information
        const enrichedBillings = [];

        for (const billing of billings) {
            // Fetch total amount paid for the current billing
            const payments = await Payment.find({ billId: billing._id });
            const totalPaid = payments.reduce((sum, payment) => sum + payment.amountPaid, 0);

            // Calculate the remaining amount
            const totalAmount = parseFloat(billing.totalAmount.toString());
            const remainingAmount = (totalAmount - totalPaid).toFixed(2); // Format to two decimal points

            // Add payment details to the billing object
            enrichedBillings.push({
                ...billing.toObject(),
                totalPaid: totalPaid.toFixed(2), // Format to two decimal points
                remainingAmount
            });
        }

        res.json(enrichedBillings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};



// Get a billing record by ID
export const getBillingById = async (req, res) => {
    try {
        // Fetch the billing record with populated references
        const billing = await Billing.findById(req.params.id)
            .populate('patientId')
            .populate('appointmentId');

        if (!billing) {
            return res.status(404).json({ message: 'Billing record not found' });
        }

        // Calculate the total amount paid
        const payments = await Payment.find({ billId: billing._id });
        const totalPaid = payments.reduce((sum, payment) => {
            if (payment.paymentStatus === 'Success') {
                return sum + payment.amountPaid;
            }
            return sum;
        }, 0);

        // Calculate the remaining amount
        const totalAmount = parseFloat(billing.totalAmount.toString());
        const remainingAmount = (totalAmount - totalPaid).toFixed(2);

        // Attach the remaining amount to the response
        const response = {
            ...billing.toObject(),
            remainingAmount,
        };

        res.json(response);
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
