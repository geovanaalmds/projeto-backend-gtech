const express = require('express');
const router = express.Router();
const userRoutes = require('../routes/UsersRoutes');
//teste da rota
router.get('/', (request, response) => {
  response.json({ status: 'API funcionando' });
});

router.use('/v1/user', userRoutes); //pra usuários

module.exports = router;
