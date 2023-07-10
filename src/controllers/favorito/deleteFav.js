const Favorito = require('../../models/Favorito')

async function deleteFavorito(req, res) {
    try {
        const fav = await Favorito.deleteOne({idUser: req.body.id_user, idTaller: req.body.id_taller})
        res.status(200).send(fav)
    }catch(err) {
        console.log(err)
    }
}

module.exports = deleteFavorito