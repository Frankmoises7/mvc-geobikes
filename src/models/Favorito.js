const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  idUser: 'string',
  idTaller: 'string',
});

module.exports = mongoose.model('Favorito', schema);

