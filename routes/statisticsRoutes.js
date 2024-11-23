import express from 'express';
import { getTotalCounts } from "../controllers/statisticsController.js";

const router = express.Router();

router.get('/counts', getTotalCounts);

export default router;