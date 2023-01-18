const AppError = require('../utils/AppError');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Ticket = require('../models/Ticket');

exports.getTickets = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError('User not found', 401));
  }

  const tickets = await Ticket.find({ user: req.user.id });

  if (!tickets) {
    return next(new AppError('Ticket not found', 404));
  }

  res.status(200).json({ tickets });
});

exports.createTicket = asyncHandler(async (req, res, next) => {
  const { product, description } = req.body;

  if (!product || !description) {
    return next(new AppError('Enter Product and Description', 404));
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError('User not found', 401));
  }

  const ticket = await Ticket.create({
    user: user._id,
    product,
    description,
    status: 'new',
  });

  if (!ticket) {
    return next(new AppError('Unable to create ticket', 400));
  }

  res.status(201).json({ ticket });
});

exports.getTicket = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError('User not found', 401));
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return next(new AppError('Ticket not found', 404));
  }

  res.status(201).json({ ticket });
});

exports.deleteTicket = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError('User not found', 401));
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return next(new AppError('Ticket not found', 404));
  }

  await ticket.remove();

  res.status(201).json({ success: true });
});

exports.updateTicket = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError('User not found', 401));
  }

  let ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return next(new AppError('Ticket not found', 404));
  }

  ticket = await Ticket.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );

  if (!ticket) {
    return next(new AppError('Unable to update ticket', 400));
  }

  res.status(200).json({ ticket });
});
