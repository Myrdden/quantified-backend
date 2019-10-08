var router = require('express').Router();
var Food = require('../../../models').Food;

router.get('/foods/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  Food.findOne({where: {id: req.params.id}})
  .then(food => {
    if(food){
      res.status(200).send(JSON.stringify(food));
    } else {
      res.status(404).send(JSON.stringify({error: "Food with ID(" + req.params.id + ") not found."}));
    }
  })
  .catch(error => {
    res.status(500).send(JSON.stringify(error));
  })
});

module.exports = router;
