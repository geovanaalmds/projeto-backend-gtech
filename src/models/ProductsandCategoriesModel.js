const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const ProductsModel = require('./ProductsModel');
const CategoriesModel = require('./CategoriesModel');

const ProductandCategoryModel = sequelize.define('ProductandCategory', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: ProductsModel,
        key: 'id'
    },
    onDelete: 'CASCADE'
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: CategoriesModel,
        key: 'id'
    },
    onDelete: 'CASCADE'
  }
  
}, {
  tableName: 'product_and_category',
  timestamps: false
});

ProductandCategoryModel.associate = (models) => {
  ProductandCategoryModel.belongsTo(models.ProductsModel, {
    foreignKey: 'product_id',
    as: 'product'
  });

  ProductandCategoryModel.belongsTo(models.CategoriesModel, {
    foreignKey: 'category_id',
    as: 'category'
  });
};



module.exports = ProductandCategoryModel;
