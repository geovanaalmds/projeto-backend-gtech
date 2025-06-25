const express = require('express');
const ProductsController = require('../controllers/ProductsController');
const ProductRoutes = express.Router();

const productController = new ProductsController();

ProductRoutes.get('/search', productController.search);
ProductRoutes.get('/:id', productController.getProductById);
ProductRoutes.post('/', productController.create);
ProductRoutes.put('/:id', productController.update);
ProductRoutes.delete('/:id', productController.delete);

module.exports = ProductRoutes;