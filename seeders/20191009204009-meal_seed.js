'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert("Meals", [{
      name: 'breakfast',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'lunch',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'dinner',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'dessert',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'snack',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Meals', null, {});
  }
};
