import express from 'express';
import {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
} from '../controllers/roomController.js';
import logRequest from '../middlewares/logRequest.js';

const router = express.Router();

// CRUD routes for Room
router.get('/', logRequest, getAllRooms);          // GET all rooms
router.get('/:id', logRequest, getRoomById);       // GET a room by ID
router.post('/', logRequest, createRoom);          // POST a new room
router.put('/:id', logRequest, updateRoom);        // PUT (update) a room
router.delete('/:id', logRequest, deleteRoom);     // DELETE a room

export default router;