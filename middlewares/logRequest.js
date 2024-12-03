import Log from "../models/Log.js";

const logRequest = async (req, res, next) => {
    const { method, originalUrl, body } = req;

    let actionType = '';
    let entityType = undefined;
    let entityId = undefined;
    let details = body;

    // Determine the action type and entity type based on the HTTP method and the URL
    if (method === 'POST') {
        actionType = 'Create';
    } else if (method === 'PUT') {
        actionType = 'Update';
    } else if (method === 'DELETE') {
        actionType = 'Delete';
    }

    // Parse entity type and ID from the URL or body
    if (originalUrl.includes('admission')) {
        entityType = 'Admission';
    } else if (originalUrl.includes('appointments')) {
        entityType = 'Appointment';
    } else if (originalUrl.includes('billing')) {
        entityType = 'Billing';
    } else if (originalUrl.includes('departments')) {
        entityType = 'Department';
    } else if (originalUrl.includes('doctorPatient')) {
        entityType = 'DoctorPatientAssignment';
    } else if (originalUrl.includes('features')) {
        entityType = 'Feature';
    }

    else if (originalUrl.includes('featureMappings')) {
        entityType = 'FeatureMapping';
    } else if (originalUrl.includes('nurseDoctor')) {
        entityType = 'NurseDoctorAssignment';
    } else if (originalUrl.includes('patients')) {
        entityType = 'Patient';
    }
    else if (originalUrl.includes('payments')) {
        entityType = 'Payment';
    } else if (originalUrl.includes('rooms')) {
        entityType = 'Room';
    } else if (originalUrl.includes('technicianDepartment')) {
        entityType = 'TechnicianDepartmentAssignment';
    } else if (originalUrl.includes('technicianPatient')) {
        entityType = 'TechnicianPatientAssignment';
    } else if (originalUrl.includes('users')) {
        entityType = 'User';
    } else if (originalUrl.includes('roles')) {
        entityType = 'UserRole';
    }

    // Add additional conditions here based on your routes/entities
    const userId = req.headers['x-user-id'];  // Make sure this matches the header used in Axios

    if (entityType && method != 'GET' && userId) {
        // Assuming the URL contains the entity ID, or we extract it from the body
        if (req.params?.id) {
            entityId = req.params.id
        }


        // Prepare the log data
        const logData = {
            userId: userId,  // Assuming you have user authentication
            actionType,
            entityType,
            entityId,
            details,
        };

        try {
            // Save the log entry into MongoDB
            await Log.create(logData);
        } catch (err) {
            console.error('Error logging request:', err);
        }
    }

    next();  // Continue with the request processing
};

export default logRequest;