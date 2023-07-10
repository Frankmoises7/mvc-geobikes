const favRoutes = require('express').Router()
const {createFav,getFavorito,deleteFav,updateFav} = require('../controllers/favorito')



favRoutes.get('/', getFavorito)
favRoutes.post('/', createFav)
favRoutes.put('/', updateFav)
favRoutes.delete('/', deleteFav)

module.exports = favRoutes
