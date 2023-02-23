const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      },
    ]
  })
  .then(dbCategoryData => res.json({ message: "All categories", dbCategoryData }))
  .catch(err => {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  });
});

// get one category
router.get('/:id', (req, res) => {
  // find a category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json({ message: `Category with id ${req.params.id}`, dbCategoryData });
  })
  .catch(err => {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  });
});

// create new category
router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json({ message: `Successfully created category with id: ${dbCategoryData.id}`, dbCategoryData }))
  .catch(err => {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  });
});

// update category
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json({ message: `Successfully updated category with id: ${dbCategoryData.id}`, dbCategoryData });
  })
  .catch(err => {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  });
});

// delete category
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json({ message: `Successfully deleted category with id: ${dbCategoryData.id}` });
  })
  .catch(err => {
    console.log(err.message);
    res.status(500).json({error: err.message});
  });
});

module.exports = router;
