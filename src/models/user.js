
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const findOrCreate = require('mongoose-findorcreate')

const schema = new mongoose.Schema({
  id: String,
  name: String,
  email: {
    type: String,
    unique: true
  },
  idAdmin: Boolean
});

// HASH Y SALT
schema.plugin(passportLocalMongoose);

// AGREGAMOS FIND OR CREATE AL SCHEMA
schema.plugin(findOrCreate);

module.exports = mongoose.model('User', schema);