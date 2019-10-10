const router = require('express').Router();
const models = require('../../../models');
const Meal = models.Meal;
const Food = models.Food;

router.get('/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  Meal.findOne({
    where: {id: req.params.id},
    include: [
      {model: Food, through: {attributes: []}}
    ]
  }).then(meal => {
    if(meal){
      res.status(200).send(JSON.stringify(meal));
    } else {
      res.status(404).send(JSON.stringify({error: "Meal with ID(" + req.params.id + ") not found."}));
    }
  })
  .catch(error => res.status(500).send(JSON.stringify(error)));
});

module.exports = router;

