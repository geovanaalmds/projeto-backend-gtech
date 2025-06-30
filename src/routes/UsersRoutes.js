const express = require('express');
const UserController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middleware/AuthMiddleware');

const UserRoutes = express.Router();

const userController = new UserController();
const authController = AuthController;

// Geração de token
UserRoutes.post('/token', authController.generateToken);
// Ações públicas
UserRoutes.get('/:id', userController.getUserById);
UserRoutes.post('/', userController.create);
// Ações protegidas
UserRoutes.put('/:id', authMiddleware, userController.update);
UserRoutes.delete('/:id', authMiddleware, userController.delete);

module.exports = UserRoutes;
