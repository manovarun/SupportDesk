const createError = require('http-errors');
const express = require('express');
const path = require('path');
const colors = require('colors');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const GlobalErrorHandler = require('./controllers/ErrorController');
const ConnectDB = require('./db');
const userRouter = require('./routes/userRoutes');
const ticketRouter = require('./routes/ticketRoutes');
const app = express();

ConnectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.status(200).json({ message: 'Welcome to Support Desk' });
});

app.use('/api/users', userRouter);
app.use('/api/tickets', ticketRouter);

app.use(GlobalErrorHandler);

module.exports = app;
