'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Food', [{
      name: 'bananas',
      calories: 150,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'cheese',
      calories: 300,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'chicken sandwich',
      calories: 700,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'steak',
      calories: 800,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Foods', null, {});
    }
  };
