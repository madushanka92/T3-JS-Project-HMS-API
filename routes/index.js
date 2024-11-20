import express from 'express';
import userRoutes from './userRoutes.js';
import userRoleRoutes from './userRoleRoutes.js';
import departmentRoutes from './departmentRoutes.js';
import patientRoutes from './patientRoutes.js';
import roomRoutes from './roomRoutes.js';

import featureRoutes from './featureRoutes.js';
import featureMappingRoutes from './featureMappingRoutes.js';


const router = express.Router();

router.use('/users', userRoutes);
router.use('/roles', userRoleRoutes);
router.use('/departments', departmentRoutes);
router.use('/patients', patientRoutes);
router.use('/rooms', roomRoutes);

router.use('/features', featureRoutes);
router.use('/featureMappings', featureMappingRoutes);

export default router;
