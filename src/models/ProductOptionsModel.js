const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const ProductsModel = require('./ProductsModel');

//Modelo das opções de produto
const ProductOptionModel = sequelize.define('ProductOption', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: ProductsModel, //Referência ao modelo de produtos
        key: 'id'
    },
    onDelete: 'CASCADE' // Apaga a opção se o produto for removido
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shape: {
    type: DataTypes.ENUM('square', 'circle'),
    allowNull: true,
    defaultValue: 'square'
  },
  radius: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  type: {
    type: DataTypes.ENUM('text', 'color'),
    allowNull: true,
    defaultValue: 'text'
  },
  values: {
    type: DataTypes.STRING, //add string com vírgulas no controller
    allowNull: false
  }
}, {
  tableName: 'product_options',
  timestamps: false
});

//Define os relacionamentos
ProductOptionModel.associate = (models) => {
  ProductOptionModel.belongsTo(models.ProductsModel, {
    foreignKey: 'product_id',
    as: 'product'
  });
};


module.exports = ProductOptionModel;
