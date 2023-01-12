const AppErorr = require('../utils/AppError');
const asyncHandler = require('express-async-handler');

exports.registerUser = asyncHandler(async (req, res, next) => {
  if (!req.body.name) {
    return next(new AppErorr('Name is required', 400));
  }

  res.send('REGISTER ROUTE');
});

exports.loginUser = (req, res, next) => {
  res.send('LOGIN ROUTE');
};
