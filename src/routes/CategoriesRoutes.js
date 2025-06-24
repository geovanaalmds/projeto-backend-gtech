const express = require('express');
const CategoriesController = require('../controllers/CategoriesController');
const CategoryRoutes = express.Router();

const categoryController = new CategoriesController();

CategoryRoutes.get('/search', categoryController.search);
CategoryRoutes.get('/:id', categoryController.getCategoryById);
CategoryRoutes.post('/', categoryController.create);
CategoryRoutes.put('/:id', categoryController.update);
CategoryRoutes.delete('/:id', categoryController.delete);

module.exports = CategoryRoutes;