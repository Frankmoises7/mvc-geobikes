const User = require('../../models/user')


async function createUsers(req, res) {
    if(req.body != null){
        try {
            const userValid = await User.findOne({ email: req.body.email })
            if(!userValid){
                console.log(req.body.name)
                console.log(req.body.email)
                console.log(req.body.isAdmin)
                await registerSchema.validateAsync({name: req.body.name , email: req.body.email, isAdmin : req.body.isAdmin, password: "Google" })
                console.log("agregando")
                const user = await User.create({id:req.body.email,name: req.body.name, email:req.body.email,isAdmin : req.body.isAdmin,password: "Google" })
                console.log("Usuario de Google insertado a la base de datos")
                res.status(201).send(user)
            }
            else{
                res.status(400).send("Usuario: "+ userValid.email+ " ya existe en la BD")
                console.log("Usuario: "+ userValid.email+ " ya existe en la BD")
            }

        }
        catch(err) {
            console.log(err)
        }
    }
    else{
        res.status(400).send("no se enviaron los datos necesarios para crear usuario")
        console.log("no se enviaron los datos necesarios para crear usuario")
    }
}

module.exports = createUsers