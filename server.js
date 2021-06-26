// Server and middleware modules/packages
const express = require('express');
const path = require('path');

// Database, Routes
const mongoose = require('mongoose');
const compression = require('compression');
const logger = require('morgan');

// Server setup
const PORT = process.env.PORT || 3001;
const app = express();

// Set public folder path
app.use(express.static(path.join(__dirname, 'public')));

// Middleware - data parsing, compression,  logger
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(logger('dev'));

// Routes
app.use(require('./routes/api-transactions.js'));

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/expenseDB', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB connected'));

// Start server
app.listen(PORT, () => console.log(`App running on port ${PORT}!`));
