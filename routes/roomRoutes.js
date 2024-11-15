import express from 'express';
import {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
} from '../controllers/roomController.js';

const router = express.Router();

// CRUD routes for Room
router.get('/', getAllRooms);          // GET all rooms
router.get('/:id', getRoomById);       // GET a room by ID
router.post('/', createRoom);          // POST a new room
router.put('/:id', updateRoom);        // PUT (update) a room
router.delete('/:id', deleteRoom);     // DELETE a room

export default router;