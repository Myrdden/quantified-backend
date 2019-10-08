var router = require('express').Router();
var Food = require('../../../models').Food;

router.get("/", function(req, res, next) {
  res.setHeader("Content-type", "application/json")

  Food.findAll()
  .then(foods => {
    res.status(200).send(JSON.stringify(foods));
  })
  .catch(error => {
    res.status(500).send(JSON.stringify(error));
  })
});

router.get('/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  Food.findOne({where: {id: req.params.id}})
  .then(food => {
    if(food){
      res.status(200).send(JSON.stringify(food));
    } else {
      res.status(404).send(JSON.stringify({error: "Food with ID(" + req.params.id + ") not found."}));
    }
  })
  .catch(error => res.status(500).send(JSON.stringify(error)));
});

router.patch('/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  Food.update(
    {name: req.body.name,
      calories: req.body.calories
    }, {where: {id: req.params.id}, returning: true})
  .then(([row, [food]]) => {
    if (row == 1) {
      res.status(200).send(JSON.stringify({food}));
    } else {
      res.status(404).send(JSON.stringify({error: "Food with ID(" + req.params.id + ") not found."}));
    }
  })
  .catch(error => res.status(500).send(JSON.stringify(error)));
});

router.post("/", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  Food.create({
          name: req.body.name,
          calories: req.body.calories,
    })
    .then(food => {
      res.status(201).send(JSON.stringify(food));
    })
    .catch(error => {
      res.status(500).send(JSON.stringify(error));
    })
});

module.exports = router;
