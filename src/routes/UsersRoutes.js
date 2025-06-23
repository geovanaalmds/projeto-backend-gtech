const express = require('express');
const UserController = require('../controllers/UsersController');
const UserRoutes = express.Router();

const userController = new UserController();

UserRoutes.get('/:id', userController.getUserById);
UserRoutes.post('/', userController.create);
UserRoutes.put('/:id', userController.update);
UserRoutes.delete('/:id', userController.delete);

module.exports = UserRoutes;