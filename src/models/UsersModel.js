const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

const saltRounds = 10;

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
  hooks: {   //hash
    beforeCreate: async (user) => {
      if (user.password) {
        const hash = await bcrypt.hash(user.password, saltRounds);
        user.password = hash;
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const hash = await bcrypt.hash(user.password, saltRounds);
        user.password = hash;
      }
    }
  }
});

module.exports = UserModel;
