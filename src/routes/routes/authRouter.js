const authRouter = require('express').Router()
const { login, register} = require('../../controllers/auth')
const { login_google} = require('../../controllers/auth')
const passport = require("passport")

authRouter.get("/login/failed" ,(req,res)=>{
    res.status(401).json({
        error:true,
        message:"fallo login de Google"
    })
})

authRouter.get(
    "/google/callback",
    passport.authenticate("google",{
        successRedirect:process.env.CLIENT_URL,
        failureRedirect:"/login/failed",
    })
)

authRouter.get("/google",passport.authenticate("google",["profile","email"]))

authRouter.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect(process.env.CLIENT_URL)
})

authRouter.post('/login', login)
authRouter.post('/register', register)
authRouter.get('/login/success',login_google);


module.exports = authRouter
