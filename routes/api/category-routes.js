const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories
router.get('/', async (req, res) => {
  try {
    // find all categories and include its associated Products
    const dbCategoryData = await Category.findAll({
      include: [{ model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] }],
    });

    res.json({ message: "All categories", dbCategoryData });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// get one category
router.get('/:id', async (req, res) => {
  try {
    // find a category by its `id` value
    // be sure to include its associated Products
    const dbCategoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [{ model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] }]
    });

    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.json({ message: `Category with id ${req.params.id}`, dbCategoryData });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });  
  }  	  	  	  	  	  	    	    	    	    	    	    	    	    	    	    	      
}); 

// create new category
router.post('/', async (req, res) => {
  try {
    // create a new category
    const dbCategoryData = await Category.create({
      category_name: req.body.category_name
    });

    res.json({ message: `Successfully created category with id: ${dbCategoryData.id}`, dbCategoryData });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// update category
router.put('/:id', async (req, res) => {
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

    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.json({ message: `Successfully updated category with id: ${dbCategoryData.id}`, dbCategoryData });

  } catch (err) {  // catch any errors that occur in the try block and log the error message to the console 
    console.log(err); // log error to console 
    res.status(500).json({ error: err.message }); // send a response with a status code of 500 and an error message as the response body  

  }  
});

// delete category
router.delete('/:id', async (req, res) => {
  try {
    // delete a category by its `id` value
    const dbCategoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.json({ message: `Successfully deleted category with id: ${dbCategoryData.id}` });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });  
  }  
}); 

module.exports = router;
