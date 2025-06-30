const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

const saltRounds = 10; //número de rounds do salt

//Modelo de usuário
const UserModel = sequelize.define('User', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
 },

  firstname: { 
    type: DataTypes.STRING, 
    allowNull: false 
 },

  surname: { 
    type: DataTypes.STRING, 
    allowNull: false 
 },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false 
 },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false },
}, {
  tableName: 'users',
  timestamps: true,
  //Hooks para o hash da senha
  hooks: {   
    //Antes de criar o usuário, aplica o hash
    beforeCreate: async (user) => {
      if (user.password) {
        const hash = await bcrypt.hash(user.password, saltRounds);
        user.password = hash;
      }
    },
    // Antes de atualizar, verifica se a senha mudou
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const hash = await bcrypt.hash(user.password, saltRounds);
        user.password = hash;
      }
    }
  }
});

module.exports = UserModel;
