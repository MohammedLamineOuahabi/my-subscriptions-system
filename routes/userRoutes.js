import express from 'express';
import userController from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/login').post(userController.authUser);

router
  .route('/profile')
  .get(protect, userController.getUserProfile)
  .put(protect, userController.updateUserProfile);

router.route('/').get(protect, admin, userController.getAllUsers).post(userController.addUser);
router
  .route('/:id')
  .get(protect, admin, userController.getUser)
  .delete(protect, admin, userController.deleteUser)
  .put(protect, admin, userController.updateUser);
export default router;
