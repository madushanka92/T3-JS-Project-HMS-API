import express from 'express';
import userRoutes from './userRoutes.js';
import userRoleRoutes from './userRoleRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/roles', userRoleRoutes);

export default router;
