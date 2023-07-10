const User = require('../../models/User')

async function getUsers(req, res) {
    try {
        const listaUsers = await User.find()
        res.send(listaUsers)
    }catch(err) {
        console.log(err)
    }
}

module.exports = getUsers