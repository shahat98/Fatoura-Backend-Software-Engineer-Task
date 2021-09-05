/* eslint-disable arrow-body-style */
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../Models/userModel');
const { retError } = require('../utils/errResponse');

// Create Token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendToken = (status, user, res) => {
  const token = signToken(user._id);
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    //secure : true, // IN production.
    httpOnly: true,
  });
  user.password = undefined;
  res.status(status).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// (status, message, res) => {
//   return res.status(status).json({
//     status: 'fail',
//     message: message,
//   });
// };

// Signup
exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    sendToken(201, newUser, res);
  } catch (err) {
    retError(404, err, res);
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    //check if the email & password is exist
    if (!email || !password) {
      return retError(400, 'Email or Password is missing.', res);
    }

    //Check is correct user with email and password
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.checkPassword(password, user.password))) {
      return retError(401, 'Email or Password is Invalid', res);
    }

    // Send the Token
    sendToken(200, user, res);
  } catch (err) {
     retError(400, err, res);
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.protectRoute = async (req, res, next) => {
  try {
    //Check if the Token exist.
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return retError(
        401,
        'You are not have the authorization to access it',
        res
      );
    }

    // Check if the Token is Valid.
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if the user still exist.
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return retError(
        401,
        'Tha user belong to this token is no longer exist',
        res
      );
    }

    // Now you can go and access it.
    req.user = currentUser;
    next();
  } catch (err) {
    return retError(401, err, res);
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return retError(403, 'You are not have a permission to do that', res);
    }
    next();
  };
};
