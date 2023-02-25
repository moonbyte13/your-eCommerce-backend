const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
router.get('/', async (req, res) => {
  try {
    // find all tags and include its associated Product data
    const dbTagData = await Tag.findAll({
      include: [{ model: Product, attributes: ['product_name'] }],
    });

    res.json({ message: 'All tags', dbTagData });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    const dbTagData = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [{ model: Product, attributes: ['product_name'] }],
    });

    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.json({ message: `Tag with id: ${req.params.id}`, dbTagData });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });  
  }  
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    // create a new tag
    const dbTagData = await Tag.create({
      tag_name: req.body.tag_name
    });

    res.json({ message: `Successfully created tag with id: ${req.params.id}`, dbTagData });

  } catch(err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const dbTagData = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    );

    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.json({ message: `Successfully updated tag with id: ${req.params.id}`, dbTagData });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }  
}); 

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    // delete on tag by its `id` value
    const dbTagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.json({ message: `Successfully deleted tag with id: ${req.params.id}`, dbTagData });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });  
  }  
});

module.exports = router;
