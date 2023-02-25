const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
router.get('/', async (req, res) => {
  // start of try/catch block
  try {
    // find all tags and include its associated Product data
    const dbTagData = await Tag.findAll({
      include: [{ model: Product, attributes: ['product_name'] }],
    });

    res.json({ message: 'All tags', dbTagData });
  } catch (err) {// catch errors and log them to the console and return a 500 status code with an error message
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }// end of try/catch block
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  // start of try/catch block
  try {
    // find a single tag by its `id` with its associated Product data
    const dbTagData = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [{ model: Product, attributes: ['product_name'] }],
    });

    // if no tag is found, return a 404 status code with an error message
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.json({ message: `Tag with id: ${req.params.id}`, dbTagData });

  } catch (err) {// catch errors and log them to the console and return a 500 status code with an error message
    console.log(err);
    res.status(500).json({ error: err.message });  
  }  // end of try/catch block
});

// create a new tag
router.post('/', async (req, res) => {
  // start of try/catch block
  try {
    // create a new tag
    const dbTagData = await Tag.create({
      tag_name: req.body.tag_name
    });

    res.json({ message: `Successfully created tag with id: ${req.params.id}`, dbTagData });

  } catch(err) {// catch errors and log them to the console and return a 500 status code with an error message
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }// end of try/catch block
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  // start of try/catch block
  try {
    // update a tag's name by its `id` value
    const dbTagData = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    );

    // if no tag is found, return a 404 status code with an error message
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.json({ message: `Successfully updated tag with id: ${req.params.id}`});

  } catch (err) {// catch errors and log them to the console and return a 500 status code with an error message
    console.log(err);
    res.status(500).json({ error: err });
  } // end of try/catch block
}); 

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  // start of try/catch block
  try {
    // delete on tag by its `id` value
    const dbTagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    // if no tag is found, return a 404 status code with an error message
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.json({ message: `Successfully deleted tag with id: ${req.params.id}`});

  } catch (err) { // catch errors and log them to the console and return a 500 status code with an error message
    console.log(err);
    res.status(500).json({ error: err.message });  
  } // end of try/catch block
});

module.exports = router;
