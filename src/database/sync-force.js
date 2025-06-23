const sequelize = require('../config/connection');

require('../models/UsersModel');
require('../models/CategoriesModel');
require('../models/ProductsModel');
require('../models/ProductImageModel');
require('../models/ProductOptionsModel');
require('../models/ProductsandCategoriesModel');

async function syncDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log('Banco sincronizado com sucesso');
    } catch(error) {
        console.error('Erro ao sincronizar banco:', error.message);
    } finally {
        await sequelize.close();
    }
}

syncDatabase();