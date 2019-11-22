const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  Id: {
    type: String
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'basic',
    enum: ["basic", "admin"]
  },
  accessToken: {
    type: String
  }
})

const User = mongoose.model('user', UserSchema)

module.exports = User;