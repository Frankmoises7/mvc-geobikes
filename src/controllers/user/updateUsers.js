const User = require('../../models/user')
const { registerSchema } = require('../../validators/userSchema')


async function updateUser(req, res) {
    if(req.body._id != null){
            try {
                console.log(req.body.name)
                console.log(req.body.email)
                console.log(req.body.isAdmin)
                await registerSchema.validateAsync({name: req.body.name , email: req.body.email, isAdmin : req.body.isAdmin, password: "Google" })
                const user = await User.updateOne({_id: req.body._id},{name: req.body.name, email:req.body.email,isAdmin : req.body.isAdmin,password: "Google" })
                res.status(201).send(user)
            }catch(err) {
                console.log(err)
            }        
    }
    else{
        res.status(400).send("usuario no registrado")
        console.log("usuario no registrado")
    }
}

module.exports = updateUser