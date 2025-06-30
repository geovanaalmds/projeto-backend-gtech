const sequelize = require('../config/connection');

// Importa os modelos para registro das tabelas
require('../models/UsersModel');
require('../models/CategoriesModel');
require('../models/ProductsModel');
require('../models/ProductImageModel');
require('../models/ProductOptionsModel');
require('../models/ProductsandCategoriesModel');

// Função para sincronizar (criar) tabelas no banco
async function syncDatabase() {
    try {
        // Força recriação das tabelas (apaga dados anteriores)
        await sequelize.sync({ force: true });
        console.log('Banco sincronizado com sucesso');
    } catch(error) {
        console.error('Erro ao sincronizar banco:', error.message);
    } finally {
        // Fecha a conexão com o banco
        await sequelize.close();
    }
}

// Executa a sincronização
syncDatabase();