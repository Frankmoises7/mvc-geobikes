const tallerRouter = require('express').Router()
const { getAllTaller, createTaller } = require('../controllers/taller')

tallerRouter.get('/', getAllTaller)
tallerRouter.post('/crear', createTaller)

module.exports = tallerRouter
