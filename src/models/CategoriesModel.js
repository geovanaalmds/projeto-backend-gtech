const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Modelo de categoria
const CategoryModel = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false
  },
  use_in_menu: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  }
}, {
  tableName: 'categories',
  timestamps: true
});

//Relacionamento de Categorias com Produtos
CategoryModel.associate = (models) => {
  CategoryModel.hasMany(models.ProductandCategoryModel, {
    foreignKey: 'category_id',
    as: 'category_product_links'
  })
}

module.exports = CategoryModel;
