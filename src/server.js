require('dotenv').config(); // Carrega variáveis do .env
const app = require('./app');

const port = process.env.port || 3000; // Define a porta do servidor

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
