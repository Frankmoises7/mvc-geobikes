const Favorito = require('../../models/Favorito')
const { favoritoSchema } = require('../../validators/favoritoSchema')


async function updateFavorito(req, res) {
    if(req.body.id_user != null){
        console.log(req.body.id_user)
        console.log(req.body.id_taller)
        console.log(req.body.new_id_taller)
        if(req.body.new_id_taller != null){
            try {
                const fav = await Favorito.updateOne({idUser : req.body.id_user,idTaller:req.body.id_taller},{idTaller:req.body.new_id_taller})
                res.status(201).send(fav)
            }catch(err) {
                console.log(err)
            }
        }
        
    }
    else{
        res.status(400).send("usuario no registrado no puede marcar un Taller como favorito")
        console.log("usuario no registrado no puede marcar un Taller como favorito")
    }
}

module.exports = updateFavorito