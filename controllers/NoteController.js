const AppError = require('../utils/AppError');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Ticket = require('../models/Ticket');
const Note = require('../models/Note');

exports.getNotes = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError('User not found', 401));
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (!ticket) {
    return next(new AppError('Ticket not found', 404));
  }

  if (ticket.user.toString() !== req.user.id) {
    return next(new AppError('User not authorized', 401));
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json({ notes });
});

exports.addNote = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError('User not found', 401));
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (!ticket) {
    return next(new AppError('Ticket not found', 404));
  }

  if (ticket.user.toString() !== req.user.id) {
    return next(new AppError('User not authorized', 401));
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  });

  res.status(201).json({ note });
});
