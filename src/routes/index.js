const express = require('express');
const router = express.Router();

const userRoutes = require('../routes/UsersRoutes');
const categoryRoutes = require('../routes/CategoriesRoutes');
const productRoutes = require('../routes/ProductsRoutes');

//Rota de teste da API
router.get('/', (request, response) => {
  response.json({ status: 'API funcionando' });
});

//Rotas principais
router.use('/v1/user', userRoutes); 
router.use('/v1/category', categoryRoutes); 
router.use('/v1/product', productRoutes);

module.exports = router;