var router = require('express').Router();
var Food = require('../../../models').Food;

router.get('/foods/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  Food.findOne({where: {id: req.params.id}})
  .then(food => {
    res.status(200).send(JSON.stringify(food));
  })
  .catch(error => {
    res.status(404).send();
  })
});

module.exports = router;
