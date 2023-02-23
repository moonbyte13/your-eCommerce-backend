const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
router.get('/', (req, res) => {

  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['product_name']
      },
    ]
  })
  .then(dbTagData => res.json({ message: "All tags", dbTagData }))
  .catch(err => {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  });
});

// find a single tag by its `id`
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json({ message: `Tag with id ${req.params.id}`, dbTagData });
  })
  .catch(err => {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  });
});

// create a new tag
router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json({ message: `Successfully created tag with id ${req.params.id}`, dbTagData }))
  .catch(err => {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  });
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json({ message: `Successfully updated tag with id ${req.params.id}`, dbTagData });
  })
  .catch(err => {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  });
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json({ message: `Successfully deleted tag with id ${req.params.id}` });
  })
  .catch(err => {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  });
});

module.exports = router;
