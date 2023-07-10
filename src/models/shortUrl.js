const mongoose = require('mongoose')
const shortId = require('shortid')
require('dotenv').config()

//Funcion para generar un shortlink aleatorio con una URL de base
function generateCustomShortLink(full) {
  const randomString = shortId.generate()
  const customShortLink = `${process.env.BASEURL}-${randomString}`
  return customShortLink
}

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: function() {
      return generateCustomShortLink(this.full)
    }
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)