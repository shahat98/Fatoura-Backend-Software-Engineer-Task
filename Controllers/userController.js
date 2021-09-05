const User = require('../Models/userModel');
const { retError } = require('../utils/errResponse');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    return retError(400, err, res);
  }
};

exports.updateRole = async (req, res) => {
  try {
    if (!req.body.role || !req.body.id) {
      return retError(400, 'User data  is missing', res);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.body.id,
      { role: req.body.role },
      {
        new: true,
        runValidators: true,
      }
    );
    
    if (!updatedUser){
      return retError(400,"User not found",res);
    }

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    retError(400, err, res);
  }
};
