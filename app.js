const express = require('express');
const morgan = require('morgan');

const userRouter = require('./Routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
app.use(express.json());

// 3) ROUTES
app.use('/api/users', userRouter);

//Capture All 404 errors
// eslint-disable-next-line arrow-body-style
app.use((req, res) => {
    return res.status(404).json({
      status: 'Not found',
      message: '404 Not Found',
    });
  });
module.exports = app;
