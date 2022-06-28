const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');

// @desc   add new Message
// @route  POST /api/v1/Message
// @access public
const addMessage = asyncHandler(async (req, res) => {
  const { username, email, message, list } = req.body;
  //check values
  if (!username || !email || !message || !list) {
    res.status(400);
    throw new Error('No infos');
  }
  const msg = new Message({
    username,
    email,
    message,
    list
  });
  try {
    await msg.save();
    res.status(201).json(msg);
  } catch (error) {
    throw new Error(error);
  }
});
// @desc   get Message by id
// @route  GET /api/v1/Messages/:id
// @access private
const getMessageById = asyncHandler(async (req, res) => {
  ///from user fields name & email
  const message = await Message.findById(req.params.id).populate('user', 'username email');

  if (Message) {
    res.status(200).json(Message);
  } else {
    res.status(404);
    throw new Error('No Message found.');
  }
});
// @desc   update Message to paid
// @route  POST /api/v1/Messages/:id/pay
// @access private
const setMessageIsPaid = asyncHandler(async (req, res) => {
  //get Message using id
  const message = await Message.findById(req.params.id);

  if (Message) {
    Message.isPaid = true;
    Message.paidAt = Date.now();
    Message.paymentResult = {
      ///paypal returns infos
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
      ///end paypal info
      ///if using other payment method
      ///we my need to add other infos
    };

    const updatedmessage = await Message.save();

    res.status(200).json(updatedMessage);
  } else {
    res.status(404);
    throw new Error('No Message found.');
  }
});

// @desc   update Message to delivered
// @route  POST /api/v1/Messages/:id/delivered
// @access private
const setMessageIsDelivered = asyncHandler(async (req, res) => {
  //get Message using id
  const message = await Message.findById(req.params.id);

  if (Message) {
    Message.deliveredAt = Date.now();

    const updatedmessage = await Message.save();

    res.status(200).json(updatedMessage);
  } else {
    res.status(404);
    throw new Error('No Message found.');
  }
});

// @desc   get Logged In user Messages
// @route  GET /api/v1/Messages/myMessages
// @access private
const getMyMessages = asyncHandler(async (req, res) => {
  //get Message using id
  const Messages = await Message.find({ user: req.user._id });
  res.json(Messages);
});

// @desc   get all Message
// @route  GET /api/v1/Message/myContacts
// @access private/admin
const getMessages = asyncHandler(async (req, res) => {
  //get Contact using id
  const message = await Message.find({}).populate('user', 'id name');
  res.json(Message);
});

module.exports = {
  addMessage
  //getMessages
  /*,
  getContactById,
  setContactIsPaid,
  getMyMessage,
  setContactIsDelivered*/
};
