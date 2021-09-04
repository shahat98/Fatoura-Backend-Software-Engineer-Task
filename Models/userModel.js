const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'you should have a name'],
    maxlength: [40, 'Name length should be less than 40 character'],
  },
  email: {
    type: String,
    required: [true, 'you should provide a email'],
    validate: [validator.isEmail, 'Email is invalid'],
    unique: [true, 'This email is used before'],
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password  must have at least 8  chars'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords are not the same.',
    },
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.checkPassword = async function (
  enterdPassword,
  userPassword
) {
  return await bcrypt.compare(enterdPassword, userPassword);
};
const User = mongoose.model('User', userSchema);

module.exports = User;
