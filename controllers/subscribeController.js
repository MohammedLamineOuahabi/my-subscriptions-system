import asyncHandler from 'express-async-handler';
import Subscribe from '../models/subscribeModel.js';

// @desc   add new Subscribe
// @route  POST /api/v1/Subscribe
// @access public
const addSubscribe = asyncHandler(async (req, res) => {
  const { email, list } = req.body;
  //check values
  console.log(req.body);
  if (!email || !list) {
    res.status(400);
    throw new Error('No infos');
  }
  //check if email exist

  const s = await Subscribe.find({ email });
  if (s.length > 0) {
    //res.status(403);
    //throw new Error('Email Already Exists!');
    return res.status(201).json({ success: true });
  }

  const subscribe = new Subscribe({
    email,
    list
  });
  try {
    await subscribe.save();
    res.status(201).json({ success: true });
  } catch (error) {
    //throw new Error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc   get all Subscribe
// @route  GET /api/v1/Subscribe/myContacts
// @access private/admin
const getSubscribes = asyncHandler(async (req, res) => {
  //get Contact using id
  const Subscribe = await Subscribe.find({}).populate('user', 'id name');
  res.json(Subscribe);
});

export default {
  addSubscribe,
  getSubscribes
  /*,
  getContactById,
  setContactIsPaid,
  getMySubscribe,
  setContactIsDelivered*/
};

/*
// @desc   get Subscribe by id
// @route  GET /api/v1/Subscribes/:id
// @access private
const getSubscribeById = asyncHandler(async (req, res) => {
  ///from user fields name & email
  const Subscribe = await Subscribe.findById(req.params.id).populate('user', 'username email');

  if (Subscribe) {
    res.status(200).json(Subscribe);
  } else {
    res.status(404);
    throw new Error('No Subscribe found.');
  }
});
// @desc   update Subscribe to paid
// @route  POST /api/v1/Subscribes/:id/pay
// @access private
const setSubscribeIsPaid = asyncHandler(async (req, res) => {
  //get Subscribe using id
  const Subscribe = await Subscribe.findById(req.params.id);

  if (Subscribe) {
    Subscribe.isPaid = true;
    Subscribe.paidAt = Date.now();
    Subscribe.paymentResult = {
      ///paypal returns infos
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
      ///end paypal info
      ///if using other payment method
      ///we my need to add other infos
    };

    const updatedSubscribe = await Subscribe.save();

    res.status(200).json(updatedSubscribe);
  } else {
    res.status(404);
    throw new Error('No Subscribe found.');
  }
});

// @desc   update Subscribe to delivered
// @route  POST /api/v1/Subscribes/:id/delivered
// @access private
const setSubscribeIsDelivered = asyncHandler(async (req, res) => {
  //get Subscribe using id
  const Subscribe = await Subscribe.findById(req.params.id);

  if (Subscribe) {
    Subscribe.deliveredAt = Date.now();

    const updatedSubscribe = await Subscribe.save();

    res.status(200).json(updatedSubscribe);
  } else {
    res.status(404);
    throw new Error('No Subscribe found.');
  }
});

// @desc   get Logged In user Subscribes
// @route  GET /api/v1/Subscribes/mySubscribes
// @access private
const getMySubscribes = asyncHandler(async (req, res) => {
  //get Subscribe using id
  const Subscribes = await Subscribe.find({ user: req.user._id });
  res.json(Subscribes);
});
 */
