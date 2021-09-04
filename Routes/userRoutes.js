const express = require('express');
const userController = require('../Controllers/userController');
const authController = require('../Controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('logout', authController.logout);

router
  .route('/')
  .get(
    authController.protectRoute,
    authController.restrictTo('admin'),
    userController.getAllUsers
  );

router
  .route('/updaterole')
  .patch(
    authController.protectRoute,
    authController.restrictTo('admin'),
    userController.updateRole
  );

module.exports = router;
