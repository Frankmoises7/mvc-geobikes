const User = require('../../models/user')
const { registerSchema } = require('../../validators/userSchema')

async function loginGoogle(req, res) {
    if(req.user){
        try {
            const userValid = await User.findOne({ email: req.user._json.email })
            if(!userValid){
                await registerSchema.validateAsync({name: req.user.displayName, email:req.user._json.email,isAdmin : false,password: "Google" })
                const user = await User.create({id:req.user._json.email,name: req.user.displayName, email:req.user._json.email,isAdmin : false,password: "Google" })
                console.log("Usuario de Google insertado a la base de datos")
            }
            else{
                console.log("Usuario: "+ userValid.email+ " ya existe en la BD")
            }

        }
        catch(err) {
            console.log(err)
        }
        res.status(200).json({
            error:false,
            message:"login de Google exitoso",
            user : req.user
        })
    }
    else{
        res.status(403).json({
            error:true,
            message:"No Autorizado"
        })
    }
}

module.exports = loginGoogle
