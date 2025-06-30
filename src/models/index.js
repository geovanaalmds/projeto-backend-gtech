const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const db = {};

// Define sequelize e Sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Importa os modelos
db.ProductsModel = require('../models/ProductsModel');
db.CategoriesModel = require('../models/CategoriesModel');
db.ProductImageModel = require('../models/ProductImageModel');
db.ProductOptionsModel = require('../models/ProductOptionsModel');
db.ProductandCategoryModel = require('../models/ProductsandCategoriesModel');

// Chama associate()
Object.keys(db).forEach(modelName => {
  if (typeof db[modelName].associate === 'function') {
    db[modelName].associate(db);
  }
});

module.exports = db;
