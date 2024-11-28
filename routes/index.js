import express from 'express';
import userRoutes from './userRoutes.js';
import userRoleRoutes from './userRoleRoutes.js';
import departmentRoutes from './departmentRoutes.js';
import patientRoutes from './patientRoutes.js';
import roomRoutes from './roomRoutes.js';

import featureRoutes from './featureRoutes.js';
import featureMappingRoutes from './featureMappingRoutes.js';
import admissionRoutes from './admissionRoutes.js';
import statisticsRoutes from "./statisticsRoutes.js";
import doctorPatientRoutes from "./doctorPatientRoutes.js";
import nurseDoctorRoutes from "./nurseDoctorRoutes.js";
import technicianPatientRoutes from "./technicianPatientRoutes.js";
import technicianDepartmentRoutes from "./technicianDepartmentRoutes.js";
import appointmentRoutes from "./appointmentRoutes.js";
import billingRoutes from "./billingRoutes.js";

import { getMappedFeaturesByRoleName } from '../controllers/featureMappingController.js';


const router = express.Router();

router.use('/users', userRoutes);
router.use('/roles', userRoleRoutes);
router.use('/departments', departmentRoutes);
router.use('/patients', patientRoutes);
router.use('/rooms', roomRoutes);
router.use('/admissions', admissionRoutes);

router.use('/features', featureRoutes);
router.use('/featureMappings', featureMappingRoutes);
router.use('/statistics', statisticsRoutes);
router.use('/doctorPatient', doctorPatientRoutes);
router.use('/nurseDoctor', nurseDoctorRoutes);
router.use('/technicianPatient', technicianPatientRoutes);
router.use('/technicianDepartment', technicianDepartmentRoutes);

router.use('/appointments', appointmentRoutes);
router.use('/billings', billingRoutes);

// Individual Routes
router.get("/feature-mappings/role/:roleName", getMappedFeaturesByRoleName);

export default router;
