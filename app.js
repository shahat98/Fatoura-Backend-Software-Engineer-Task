const express = require('express');
const morgan = require('morgan');

const userRouter = require('./Routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
app.use(express.json());

// 3) ROUTES
app.use('/api/users', userRouter);

module.exports = app;
