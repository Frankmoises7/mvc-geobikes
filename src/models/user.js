const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
  email: {
      type: String,
      required: true,
      min: 6,
      max: 1024
  },
  password: {
      type: String,
      required: true,
      minlength: 6
  },
  date: {
      type: Date,
      default: Date.now
  }
})

userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword= function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);
