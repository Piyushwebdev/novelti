const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
  state: String,
  country: String,
  zipCode: String,
});

module.exports = mongoose.model('User', userSchema);
