const { DataTypes } = require('sequelize');
const sequelize  = require('../database/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

sequelize.sync()
  .then(() => {
    console.log('User model synchronized with the database');
  })
  .catch((error) => {
    console.error('synchronizing error:', error);
  });

module.exports = User;
