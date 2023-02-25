const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}
// Define table columns and configuration
ProductTag.init(
  {
    // Define an id column
    id: {
      type: DataTypes.INTEGER,
      // This is the equivalent of `SQL's` `NOT NULL` option
      allowNull: false,
      // Instruct that this is the Primary Key
      primaryKey: true,
      // Turn on auto increment
      autoIncrement: true,
    },
    // Define a product_id column
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        // This references the `product` model, which we set in `Product.js` as its `modelName` property
        model: 'product',
        // This references the `id` column in `product`
        key: 'id',
      },
    },
    // Define a tag_id column
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        // This references the `tag` model, which we set in `Tag.js` as its `modelName` property
        model: 'tag',
        // This references the `id` column in `tag`
        key: 'id',
      },
    },
  },
  {
    // Pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
