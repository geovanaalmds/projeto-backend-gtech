const express = require('express');
const ProductsController = require('../controllers/ProductsController');
const authMiddleware = require('../middleware/AuthMiddleware');

const ProductRoutes = express.Router();

const productController = new ProductsController();

// Ações públicas
ProductRoutes.get('/search', productController.search);
ProductRoutes.get('/:id', productController.getProductById);
// Ações protegidas
ProductRoutes.post('/', authMiddleware, productController.create);
ProductRoutes.put('/:id', authMiddleware, productController.update);
ProductRoutes.delete('/:id', authMiddleware, productController.delete);

module.exports = ProductRoutes;