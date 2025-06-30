const express = require('express');
const CategoriesController = require('../controllers/CategoriesController');
const authMiddleware = require('../middleware/AuthMiddleware');
const CategoryRoutes = express.Router();

const categoryController = new CategoriesController();

// Ações públicas
CategoryRoutes.get('/search', categoryController.search);
CategoryRoutes.get('/:id', categoryController.getCategoryById);
// Ações protegidas
CategoryRoutes.post('/', authMiddleware, categoryController.create);
CategoryRoutes.put('/:id', authMiddleware, categoryController.update);
CategoryRoutes.delete('/:id', authMiddleware, categoryController.delete);

module.exports = CategoryRoutes;