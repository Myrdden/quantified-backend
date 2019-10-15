const router = require('express').Router();
const models = require('../../../models');
const Sequelize = require('sequelize');
const Meal = models.Meal;
const Food = models.Food;
const MealFood = models.MealFoods;

const sequelize = new Sequelize('database', 'username', 'password', {
  host: process.env.HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  },
});

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  Meal.findAll({
    attributes: ["id", "name"],
    include: [{
      model: Food, through: { attributes: []}}
    ]
  })
  .then(meals => {
    res.status(200).send(meals);
  })
  .catch(error => res.status(404).send(error));
});

router.get('/:id/foods', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  Meal.findOne({
    where: {id: req.params.id},
    include: [{model: Food, through: {attributes: []}}]
  }).then(meal => {
    if(meal){
      res.status(200).send(meal);
    } else {
      res.status(404).send({error: "Meal with ID(" + req.params.id + ") not found."});
    }
  })
  .catch(error => res.status(500).send(error));
});


router.post('/:meal/foods/:food', (req, res) => {
  res.setHeader("Content-Type", "application/json");
  MealFood.create({
    MealId: req.params.meal,
    FoodId: req.params.food
  })
  .then(food => res.status(201).send(food))
  .catch(error => res.status(500).send(error));
});

router.delete('/:meal_id/foods/:id', (req, res) => {
  res.setHeader("Content-Type", "application/json");
  MealFood.destroy({
    where: {
      MealId: req.params.meal_id,
      FoodId: req.params.id
    }
  })
    .then(row => {
      if (row == 1) {
        res.status(204).send()
      } else {
        res.status(404).send({error: "Food with ID(" + req.params.id + ") not found."});
      }
    })
    .catch(error => res.status(500).send({error}));
})

router.get('/most_popular_food', (req, res) => {
  res.setHeader("Content-Type", "application/json");

  MealFood.findAll({
    attributes:
      ['FoodId', [Sequelize.fn('count', Sequelize.col('FoodId')),'count']],
      group : ['MealFoods.FoodId'],
      raw: true,
      order: sequelize.literal('count DESC LIMIT 1')
  })
  .then(mostPopular => {
    console.log(mostPopular)
    Food.findOne({
      where: {
        id: mostPopular[0].FoodId
      }
    })
    .then(food => {
      res.status(200).send(food)
    })
  })
  .catch(error => res.status(500).send({error}));
})

module.exports = router;
