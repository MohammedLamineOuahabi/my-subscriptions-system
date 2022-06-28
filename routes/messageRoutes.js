import express from 'express';
import messageController from '../controllers/messageController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(messageController.addMessage);
export default router;
