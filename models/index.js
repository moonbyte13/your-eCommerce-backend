// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Category.hasOne(Product, {
  foreignKey: 'driver_id',
  onDelete: 'CASCADE',
});

Product.belongsTo(Category, {
  foreignKey: 'driver_id',
});

Category.hasMany(Car, {
  foreignKey: 'driver_id',
  onDelete: 'CASCADE',
});

Car.belongsTo(Category, {
  foreignKey: 'driver_id',
});
// Products belongsTo Category

// Categories have many Products

// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
