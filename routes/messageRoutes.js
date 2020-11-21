const express = require('express');
const messageController = require('../controllers/messageController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(messageController.addMessage);
// .get(protect, admin, messageController.getMessages);
///router.route('/myorders').get(protect, messageController.getMyOrders);
///router.route('/:id').get(protect, messageController.getOrderById);
///router.route('/:id/pay').put(protect, messageController.setOrderIsPaid);
///router.route('/:id/delivered').put(protect, messageController.setOrderIsDelivered);

module.exports = router;
