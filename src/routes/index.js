const express = require('express');
const router = express.Router();

//teste da rota
router.get('/', (request, response) => {
  response.send('API funcionando 🚀');
});

module.exports = router;
