import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

//captureUserTokenAndProtectMiddleware
const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer')) {
    token = token.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      //console.log(req.user);
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw Error('Not authorized token failed');
    }
  }

  if (!token) {
    console.log('token not found');
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not Authorized.');
  }
};

export { protect, admin };
