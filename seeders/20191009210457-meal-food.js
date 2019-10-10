'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("MealFoods", [{
      createdAt: new Date(),
      updatedAt: new Date(),
      MealId: 1,
      FoodId: 1
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      MealId: 1,
      FoodId: 2
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      MealId: 2,
      FoodId: 1
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      MealId: 3,
      FoodId: 3
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      MealId: 4,
      FoodId: 1
    }
  ], {});
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MealFoods', null, {});
  }
};
