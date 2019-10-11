const router = require('express').Router();
const models = require('../../../models');
const Meal = models.Meal;
const Food = models.Food;
const MealFood = models.MealFoods;

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  Meal.findAll({
    attributes: ["id", "name"],
    include: [{
      model: Food, through: { attributes: []}}
    ]
  })
  .then(meals => {
    res.status(200).send(JSON.stringify(meals));
  })
  .catch(error => res.status(500).send(JSON.stringify(error)));
});

router.get('/:id/foods', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  Meal.findOne({
    where: {id: req.params.id},
    include: [{model: Food, through: {attributes: []}}]
  }).then(meal => {
    if(meal){
      res.status(200).send(JSON.stringify(meal));
    } else {
      res.status(404).send(JSON.stringify({error: "Meal with ID(" + req.params.id + ") not found."}));
    }
  })
  .catch(error => res.status(500).send(JSON.stringify(error)));
});

router.post('/:meal/foods/:food', (req, res) => {
  res.setHeader("Content-Type", "application/json");
  MealFood.create({
    MealId: req.params.meal,
    FoodId: req.params.food
  })
  .then(food => res.status(201).send(JSON.stringify(food)))
  .catch(error => res.status(500).send(JSON.stringify(error)));
});


module.exports = router;
