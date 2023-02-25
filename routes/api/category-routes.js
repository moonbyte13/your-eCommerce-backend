const router = require('express').Router();
const { Category, Product } = require('../../models');

// get all categories
router.get('/', async (req, res) => {
  // start of try/catch block
  try {
    // find all categories and include its associated Products
    const dbCategoryData = await Category.findAll({
      include: [{ model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] }],
    });

    res.json({ message: "All categories", dbCategoryData });
  } catch (err) {// catch errors and log them to the console and return a 500 status code with an error message
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }// end of try/catch block
});

// get one category
router.get('/:id', async (req, res) => {
  // start of try/catch block
  try {
    // find a category by its `id` value with its associated Products
    const dbCategoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [{ model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] }]
    });

    // if no category is found, return a 404 status code with an error message
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.json({ message: `Category with id ${req.params.id}`, dbCategoryData });

  } catch (err) {// catch errors and log them to the console and return a 500 status code with an error message
    console.log(err);
    res.status(500).json({ error: err.message });  
  }// end of try/catch block
}); 

// create new category
router.post('/', async (req, res) => {
  // start of try/catch block
  try {
    // create a new category
    const dbCategoryData = await Category.create({
      category_name: req.body.category_name
    });

    res.json({ message: `Successfully created category with id: ${req.params.id}`, dbCategoryData });

  } catch (err) {// catch errors and log them to the console and return a 500 status code with an error message
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }// end of try/catch block
});

// update category
router.put('/:id', async (req, res) => {
  // start of try/catch block
  try {
    // update a category by its `id` value
    const dbCategoryData = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    // if no category is found, return a 404 status code with an error message
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.json({ message: `Successfully updated category with id: ${req.params.id}`});

  } catch (err) {  // catch any errors that occur in the try block and log the error message to the console 
    console.log(err); // log error to console 
    res.status(500).json({ error: err.message }); // send a response with a status code of 500 and an error message as the response body  

  } // end of try/catch block
});

// delete category
router.delete('/:id', async (req, res) => {
  // start of try/catch block
  try {
    // delete a category by its `id` value
    const dbCategoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    // if no category is found, return a 404 status code with an error message
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.json({ message: `Successfully deleted category with id: ${req.params.id}`});

  } catch (err) {// catch errors and log them to the console and return a 500 status code with an error message
    console.log(err);
    res.status(500).json({ error: err.message });  
  } // end of try/catch block
}); 

module.exports = router;
