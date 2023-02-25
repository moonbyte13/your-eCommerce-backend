// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      // This is the equivalent of `SQL's` `NOT NULL` option
      allowNull: false,
      // Instruct that this is the Primary Key
      primaryKey: true,
      // Turn on auto increment
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      // This is the equivalent of `SQL's` `NOT NULL` option
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      // This is the equivalent of `SQL's` `NOT NULL` option
      allowNull: false,
      // This is the equivalent of `SQL's` `DECIMAL` option
      isDecimal: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      // This is the equivalent of `SQL's` `NOT NULL` option
      allowNull: false,
      // This is the equivalent of `SQL's` `DEFAULT` option
      defaultValue: 0,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        // This references the `category` model, which we set in `Category.js` as its `modelName` property
        model: 'category',
        // This references the `id` column in `category` model
        key: 'id',
      }
    }
  },
  {
    // Pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
