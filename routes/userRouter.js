const { Router } = require('express');
const userRouter = Router();
const userController = require('../controllers/usersController');

//User routes
userRouter
.get('/', userController.userListGet)
.get( '/create', userController.userCreateGet  )
.post('/create', userController.userCreatePost  )

module.exports = userRouter;