const express = require('express');
const app = express();

app.use(express.json()); // Habilita o uso de JSON no corpo das requisições

const routes = require('./routes');
app.use(routes); // Aplica as rotas da aplicação

module.exports = app; // Exporta o app para uso no servidor
