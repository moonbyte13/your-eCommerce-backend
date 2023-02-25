const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// get all products
router.get('/', async (req, res) => {
  // start of try/catch block
  try {
    // find all products and include its associated Category and Tag data
    const dbProductData = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['category_name']
        },
        {
          model: Tag,
          attributes: ['tag_name']
        }
      ] 
    });

    res.json({ message: "All products", dbProductData });

  } catch (err) {   // catch errors and log them to the console and return a 500 status code with an error message 

    console.log(err.message);  

    res.status(500).json({ error: err.message });

  }   // end of try/catch block 

 });

// get one product
router.get('/:id', async (req, res) => {
  // start of try/catch block
  try {
    // find a single product by its `id` with its associated Category and Tag data
    const dbProductData = await Product.findOne({
      where: {
        id: req.params.id
      },
      include: [{ model: Category, attributes: ['category_name'] }, { model: Tag, attributes: ['tag_name'] }]
    });

    // if no product is found, return a 404 status code with an error message
    if (!dbProductData) return res.status(404).json({ message: 'No product found with this id' });

    res.json({ message: `Product with id ${req.params.id}`, dbProductData });

  } catch (err) {  // catch errors and log them to the console and return a 500 status code with an error message
    console.log(err);
    res.status(500).json({ error: err });
  }  // end of try/catch block
}); 

// create new product
router.post('/', async (req, res) => { 
  // start of try/catch block
  try {
    // create a new product
    const product = await Product.create(req.body);

    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.tagIds.length) {
      // create a new array of product tag ids
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));

      // bulk create the product tag ids
      const tagArr = await ProductTag.bulkCreate(productTagIdArr);

      // return the product data with the product tags
      return res.status(200).json({
        message: `Successfully created product with id: ${product.id}`,
        product,
        tags: tagArr,
      });
    }

    return res.status(200).json({ message: `Successfully created product with id: ${product.id}`, product });
  } catch (err) { // catch errors and log them to the console and return a 500 status code with an error message
    console.log(err);

    return res.status(400).json({ error: err });
  }  // end of try/catch block
});

// update product
router.put('/:id', async (req, res) => {
  try {
    // update product data
    const product = await Product.update(req.body, { where: { id: req.body.tagIds } });

    // find all associated tags from ProductTag
    const productTags = await ProductTag.findAll({ where: { product_id: req.params.id }});

    // get list of current tag_ids
    const productTagIds = productTags.map(( tag ) => tag);

    // create filtered list of new tag_ids
    const newProductTags = await req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => ({ product_id: req.params.id, tag_id }));

    // figure out which ones to remove
    const productTagsToRemove = productTags.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id)).map(({ id }) => id);


    // run both actions in parallel using Promise.all() 
    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags)
    ]);  	  		  		  	  	  	  	 	 	 	 	 	       

    res.json({ message: `Successfully updated product with id: ${req.params.id}`});    

  } catch (err) { // catch errors and log them to the console and return a 500 status code with an error message    
      console.log(err);      
      res.status(400).json({ error: err });      
  }// end of try/catch block  
}); 

// delete product
router.delete('/:id', async (req, res) => {
  // start of try/catch block
  try {
    // delete one product by its `id` value
    const dbProductData = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    // if no product is found, return a 404 status code with an error message
    if (!dbProductData) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }

    res.json({ message: `Successfully deleted product with id: ${req.params.id}`});

  } catch (err) { // catch errors and log them to the console and return a 500 status code with an error message
    console.log(err);
    res.status(500).json({ error: err.message }); 
  } // end of try/catch block
});

module.exports = router;
