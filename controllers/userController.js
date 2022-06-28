import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Auth user & get token
// @route POST /api/v1/login
// @access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error('incorrect email or password ');
  }
});

// @desc add user & get token
// @route POST /api/v1/users/
// @access public
const addUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //check if user exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('Sorry,user already exists. ');
  }

  const user = await User.create({ username, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('invalid user data. ');
  }
});

// @desc Auth user & get token
// @route GET /api/v1/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw Error('user not found');
  }
});
// @desc update user
// @route GET /api/v1/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(401);
    throw Error('user not found');
  }
});
// @desc Auth user & get token
// @route GET /api/v1/users/
// @access private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (users) {
    res.status(200).json(users);
  }
});

// @desc delete a user
// @route DELETE /api/v1/users/:id
// @access private
const deleteUser = asyncHandler(async (req, res) => {
  //find the user
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'user deleted' });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

// @desc get a user by id
// @route get /api/v1/users/:id
// @access private
const getUser = asyncHandler(async (req, res) => {
  //find the user
  const user = await User.findById(req.params.id).select('-password'); ///
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

// @desc update a user
// @route PUT /api/v1/users/:id
// @access private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username;
    user.email = req.body.email;
    user.isAdmin = req.body.isAdmin;
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    });
  } else {
    res.status(401);
    throw Error('user not found');
  }
});

export default {
  authUser,
  getUserProfile,
  updateUserProfile,
  addUser,
  getAllUsers,
  deleteUser,
  getUser,
  updateUser
};
