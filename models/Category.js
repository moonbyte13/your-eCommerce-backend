const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Category extends Model {}

// create fields/columns for Category model
Category.init(
  {
    // define an id column
    id: {
      type: DataTypes.INTEGER,
      // This is the equivalent of `SQL's` `NOT NULL` option
      allowNull: false,
      // Instruct that this is the Primary Key
      primaryKey: true,
      // Turn on auto increment
      autoIncrement: true,
    },
    // define a category_name column
    category_name: {
      type: DataTypes.STRING,
    },
  },
  {
    // Pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
