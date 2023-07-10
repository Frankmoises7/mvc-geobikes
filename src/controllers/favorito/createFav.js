const Favorito = require('../../models/Favorito')
const User = require('../../models/user')
const { favoritoSchema } = require('../../validators/favoritoSchema')


async function createFavorito(req, res) {
    if(req.body.id_user != null){
        console.log(req.body.id_user)
        console.log(req.body.id_taller)
        const userValid = await User.findOne({ email: req.body.id_user })
        if(!userValid){
            try {
                await favoritoSchema.validateAsync({idUser : req.body.id_user, idTaller:req.body.id_taller })
                const fav = await Favorito.create({idUser : req.body.id_user, idTaller:req.body.id_taller})
                res.status(201).send(fav)
            }catch(err) {
                console.log(err)
            }
        }
        else{
            res.status(400).send("usuario no existe")
            console.log("usuario no existe")
        }
    }
    else{
        res.status(400).send("usuario no registrado no puede marcar un Taller como favorito")
        console.log("usuario no registrado no puede marcar un Taller como favorito")
    }
}

module.exports = createFavorito