const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}
// Define table columns and configuration
Tag.init(
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
    // Define a tag_name column
    tag_name: {
      type: DataTypes.STRING,
    },
  },
  {
    // Pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
