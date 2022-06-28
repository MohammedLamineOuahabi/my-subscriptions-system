import express from 'express';
import subscribeController from '../controllers/subscribeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(subscribeController.addSubscribe)
  .get(protect, admin, subscribeController.getSubscribes);

export default router;
