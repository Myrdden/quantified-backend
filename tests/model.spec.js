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
    test('CREATE', async () => {
      let createdFood = await Food.create({id: 1234, name: 'yeetfruit', calories: 9001});
      let allFoods = await Food.findAll();
      expect(createdFood.id).toBe(1234);
      expect(createdFood.name).toBe('yeetfruit');
      expect(createdFood.calories).toBe(9001);
      expect(allFoods.length).toBe(5);
      await Food.destroy({where: {id: 1234}});
    });
    test('UPDATE', async () => {
      await Food.create({id: 1234, name: 'yeetfruit', calories: 9001});
      await Food.update({calories: 2}, {where: {id: 1234}});
      let testFood = await Food.findOne({where: {id: 1234}});
      expect(testFood.calories).toBe(2);
      await Food.destroy({where: {id: 1234}});
    });
    test('DELETE', async () => {
      await Food.destroy({where: {id: 1}});
      let allFoods = await Food.findAll();
      expect(allFoods.length).toBe(3);
      await Food.create({id: 1, name: 'banana', calories: 150});
    });
  });
});


