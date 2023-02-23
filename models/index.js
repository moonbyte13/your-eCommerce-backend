// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

Category.hasMany(Tag, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    as: 'product_tags',
  },
});

Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    as: 'product_tags',
  },
});

// Products belongsTo Category

// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)

// Categories have many Products


/* Product belongs to Category, and Category has many Product models, as a category can have multiple products but a product can only belong to one category.

Product belongs to many Tag models, and Tag belongs to many Product models. Allow products to have multiple tags and tags to have many products by using the ProductTag through model. */


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
