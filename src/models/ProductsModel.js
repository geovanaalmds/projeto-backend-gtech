const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Modelo de Produtos
const ProductsModel = sequelize.define('Products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
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
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  price_with_discount: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'products',
  timestamps: true
});

//Relacionamento do Produto com outras tabelas
ProductsModel.associate = (models) => {
  //Relacionamento ProductsModel e ProductOptionsModel
  ProductsModel.hasMany(models.ProductOptionsModel, {
    foreignKey: 'product_id',
    as: 'options'
  });

  //Relacionamento ProductsModel e ProductImage
  ProductsModel.hasMany(models.ProductImageModel, {
    foreignKey: 'product_id',
    as: 'images'
  });

  //Relacionamento ProductsModel e ProductandCategoryModel
  ProductsModel.hasMany(models.ProductandCategoryModel, {
    foreignKey: 'product_id',
    as: 'product_category_links'
  });
};

module.exports = ProductsModel;
