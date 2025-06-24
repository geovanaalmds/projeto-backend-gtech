const express = require('express');
const router = express.Router();

const userRoutes = require('../routes/UsersRoutes');
const categoryRoutes = require('../routes/CategoriesRoutes');
const productRoutes = require('../routes/ProductsRoutes');
//teste da rota
router.get('/', (request, response) => {
  response.json({ status: 'API funcionando' });
});

router.use('/v1/user', userRoutes); //pra usuários
router.use('/v1/category', categoryRoutes); //pra categorias
router.use('/v1/product', productRoutes);



module.exports = router;