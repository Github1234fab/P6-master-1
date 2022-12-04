const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const user_schema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

user_schema.plugin(uniqueValidator);

module.exports = mongoose.model('User_schema', user_schema);