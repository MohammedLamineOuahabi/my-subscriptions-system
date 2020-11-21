const express = require('express');
const subscribeController = require('../controllers/subscribeController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .post(subscribeController.addSubscribe)
  .get(protect, admin, subscribeController.getSubscribes);
///router.route('/myorders').get(protect, subscribeController.getMyOrders);
///router.route('/:id').get(protect, subscribeController.getOrderById);
///router.route('/:id/pay').put(protect, subscribeController.setOrderIsPaid);
///router.route('/:id/delivered').put(protect, subscribeController.setOrderIsDelivered);

module.exports = router;
