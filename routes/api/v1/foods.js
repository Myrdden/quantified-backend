const router = require('express').Router();
const Food = require('../../../models').Food;
const MealFoods = require('../../../models').MealFoods;

router.get("/", (req, res) => {
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
      res.status(200).send(JSON.stringify(food));
    } else {
      res.status(404).send(JSON.stringify({error: "Food with ID(" + req.params.id + ") not found."}));
    }
  })
  .catch(error => res.status(500).send(JSON.stringify(error)));
});

router.post("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (req.body.name == null){
    res.status(500).send("Name cannot be empty")
  } else if (req.body.calories == null) {
    res.status(500).send("Calories cannot be empty")
  } else {
    Food.create({
      name: req.body.name,
      calories: req.body.calories,
    })
    .then(food => res.status(201).send(food))
    .catch(error => {
      res.status(500).send(error)
    });
  }
})

router.delete('/:id', (req, res) => {
  res.setHeader("Content-Type", "application/json");
  MealFoods.destroy({where: {FoodId: req.params.id}})
  .then(() => {
    Food.destroy({where: {id: req.params.id}})
    .then(row => {
      if (row == 1) {
        res.status(204).send()
      } else {
        res.status(404).send(JSON.stringify({error: "Food with ID(" + req.params.id + ") not found."}));
      }
    })
    .catch(error => res.status(500).send({error}));
  })
  .catch(error => res.status(500).send({error}));
});

module.exports = router;
