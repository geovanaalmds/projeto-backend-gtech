const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Modelo da tabela de associação entre produtos e categorias
const ProductandCategoryModel = sequelize.define('ProductandCategory', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'products', //Referência a tabela products
        key: 'id'
    },
    onDelete: 'CASCADE' //Apaga a ligação se o produto for removido
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'categories', //Referência a tabela categories
        key: 'id'
    },
    onDelete: 'CASCADE' //Apaga a ligação se a categoria for removida
  }
  
}, {
  tableName: 'product_and_category',
  timestamps: false
});

//Define os relacionamentos
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
