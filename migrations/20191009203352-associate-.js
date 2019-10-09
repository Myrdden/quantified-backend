'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Food belongsToMany Meal
    return queryInterface.createTable(
      'MealFoods',
      {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        MealId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        FoodId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    // remove table
    return queryInterface.dropTable('MealFoods');
  },
};
