const { Sequelize } = require('sequelize');
require('dotenv').config();

// Cria a conexão com o banco usando variáveis de ambiente
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nome do banco
  process.env.DB_USER, // Usuário
  process.env.DB_PASS, // Senha
  {
    host: process.env.DB_HOST, // Host
    dialect: 'mysql', // Banco
    logging: false, // Desativa logs SQL no terminal
  }
);

module.exports = sequelize;
