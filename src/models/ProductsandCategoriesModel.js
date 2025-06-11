const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const ProductandCategoryModel = sequelize.define('ProductandCategory', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'products',
        key: 'id'
    },
    onDelete: 'CASCADE'
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'categories',
        key: 'id'
    },
    onDelete: 'CASCADE'
  }
  
}, {
  tableName: 'product_and_category',
});

module.exports = ProductandCategoryModel;
