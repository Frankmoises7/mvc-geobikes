

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tallerSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['Feature']
  },
  geometry: {
    type: {
      type: String,
      required: true,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  properties: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    direccion: {
      type: String,
      required: true
    },
    telefono: {
      type: String,
      required: true
    },
  }
});

const Taller = mongoose.model('Taller', tallerSchema);

module.exports = Taller;
