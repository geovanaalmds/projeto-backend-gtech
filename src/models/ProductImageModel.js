const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const ProductsModel = require('./ProductsModel');

const ProductImageModel = sequelize.define('ProductImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: ProductsModel, //chave estrangeira
        key: 'id'
    },
    onDelete: 'CASCADE' //apaga as imagens se o produto for excluído
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'product_images',
  timestamps: false
});

ProductImageModel.associate = (models) => {
  ProductImageModel.belongsTo(models.ProductsModel, {
    foreignKey: 'product_id',
    as: 'product'
  });
};

module.exports = ProductImageModel;
