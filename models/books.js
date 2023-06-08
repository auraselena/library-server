'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  books.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    status: DataTypes.INTEGER,
    pages: DataTypes.INTEGER,
    published: DataTypes.INTEGER,
    language: DataTypes.STRING,
    isDeleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'books',
  });
  return books;
};