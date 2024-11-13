import express from 'express';
import userRoutes from './userRoutes.js';
import userRoleRoutes from './userRoleRoutes.js';
import departmentRoutes from './departmentRoutes.js';


const router = express.Router();

router.use('/users', userRoutes);
router.use('/roles', userRoleRoutes);
router.use('/departments', departmentRoutes);

export default router;
