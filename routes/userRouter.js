const { Router } = require('express');
const userRouter = Router();
const userController = require('../controllers/usersController');

//User routes
userRouter
.get('/', userController.userListGet)
.get( '/create', userController.userCreateGet  )
.post('/create', userController.userCreatePost  )
.get( '/:id/update', userController.usersUpdateGet )
.post('/:id/update', userController.usersUpdatePost )
.post('/:id/delete', userController.usersDeletePost )
.get('/search', userController.searchUser )

module.exports = userRouter;