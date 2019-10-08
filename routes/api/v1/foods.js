var express = require("express")
var router = express.Router();
var Food = require('../../../models').Food;

router.get("/", function(req, res, next) {
  res.setHeader("Content-type", "application/json")

  Food.findAll()
  .then(foods => {
    res.status(200).send(JSON.stringify(foods));
  })
  .catch(error => {
    res.status(500).send({error})
  });
});

module.exports = router;
