const userRouter = require('express').Router()
const {updateUsers,deleteUsers,getUsers,createUsers} = require('../controllers/user')



userRouter.get('/', getUsers)
userRouter.put('/', updateUsers)
userRouter.post('/', createUsers)
userRouter.delete('/', deleteUsers)

module.exports = userRouter
