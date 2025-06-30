const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Modelo das imagens dos produtos
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
        model: 'products', // Referência a tabela products
        key: 'id'
    },
    onDelete: 'CASCADE' //Apaga as imagens se o produto for removido
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

//Define o relacionamento
ProductImageModel.associate = (models) => {
  ProductImageModel.belongsTo(models.ProductsModel, {
    foreignKey: 'product_id',
    as: 'product'
  });
};

module.exports = ProductImageModel;
