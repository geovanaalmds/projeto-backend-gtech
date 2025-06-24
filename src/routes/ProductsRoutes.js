const express = require('express');
const ProductsController = require('../controllers/ProductsController');
const ProductRoutes = express.Router();

const productController = new ProductsController();
