import express from 'express';
import {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
} from '../controllers/userController.js';
import { loginUser } from '../controllers/authController.js';
import logRequest from '../middlewares/logRequest.js';

const router = express.Router();

router.get('/', logRequest, getAllUsers);
router.post('/', logRequest, createUser);
router.get('/:id', logRequest, getUserById);
router.put('/:id', logRequest, updateUser);
router.delete('/:id', logRequest, deleteUser);

router.post('/login', logRequest, loginUser);

export default router;
