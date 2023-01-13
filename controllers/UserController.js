const AppError = require('../utils/AppError');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new AppError('Please provide a name, email & password', 400));
  }

  let user = await User.findOne({ email });

  if (user) {
    return next(new AppError('User already exists', 400));
  }

  user = await User.create({ name, email, password });

  if (!user) {
    return next(new AppError('Unable to create user', 400));
  }

  const token = await user.getSignedJWTToken();

  if (!token) {
    return next(
      new AppError('Unable to process request, please try again', 400)
    );
  }

  return res.status(201).json({ status: 'success', user, token });
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide valid email and password', 400));
  }

  let user = await User.findOne({ email });

  if (!user) {
    return next(new AppError('User not exists', 400));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new AppError('Invalid password, please try again', 401));
  }

  const token = await user.getSignedJWTToken();

  if (!token) {
    return next(
      new AppError('Unable to process request, please try again', 400)
    );
  }

  return res.status(200).json({ status: 'success', user, token });
});

exports.getMe = asyncHandler(async (req, res, next) => {
  let user = req.user;

  if (!user) {
    return next(new AppError('Unable to find user', 400));
  }
  return res.status(200).json({ status: 'success', user });
});
