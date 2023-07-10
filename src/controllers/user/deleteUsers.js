const User = require('../../models/User')

async function deleteUser(req, res) {
    try {
        const user = await User.deleteOne({_id: req.body._id})
        res.status(200).send(user)
    }catch(err) {
        console.log(err)
    }
}

module.exports = deleteUser