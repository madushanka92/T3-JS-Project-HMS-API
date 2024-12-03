import express from 'express';
import { getTotalCounts } from "../controllers/statisticsController.js";
import logRequest from '../middlewares/logRequest.js';

const router = express.Router();

router.get('/counts', logRequest, getTotalCounts);

export default router;