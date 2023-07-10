const Favorito = require('../../models/Favorito')

async function getFavorito(req, res) {
    try {
        const listaFav = await Favorito.find({idUser: req.body.id_user})
        res.send(listaFav)
    }catch(err) {
        console.log(err)
    }
}

module.exports = getFavorito