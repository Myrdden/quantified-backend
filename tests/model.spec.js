const shell = require('shelljs');
const request = require("supertest");
const app = require('../app');
const Food = require('../models').Food;

describe('Model Tests', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:drop');
    shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');
  });
  afterAll(() => {
    shell.exec('npx sequelize db:drop');
  });

  describe('Foods', () => {
    test('FIND ALL', async () => {
      let allTheFoods = await Food.findAll();
      expect(allTheFoods.length).toBe(4);
      expect(allTheFoods[0].name).toBe('banana');
      expect(allTheFoods[0].calories).toBe(150);
    });
    test('FIND ONE', async () => {
      let foundFood = await Food.findOne({where: {id: 3}});
      expect(foundFood.name).toBe('chicken sandwich');
      expect(foundFood.calories).toBe(700);
    });
    test('CREATE', () => {

    });
    test('UPDATE', () => {

    });
    test('DELETE', () => {

    });
  });
});


