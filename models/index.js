// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Categories have many Products
Category.hasMany(Tag, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Tags belong to Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Tags belong to Category
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    as: 'product_tags',
  },
});

// Tags belong to Category
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    as: 'product_tags',
  },
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
