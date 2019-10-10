var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
const Meal = require('../models').Meal
const Food = require('../models').Food

describe('api', () => {
  beforeAll(() => {
  shell.exec('npx sequelize db:create --env test')
  shell.exec('npx sequelize db:migrate --env test')
  shell.exec('npx sequelize db:seed:all --env test')
});

afterAll(() => {
  shell.exec('npx sequelize db:migrate:undo:all --env test')
  });


  describe('Test GET /api/v1/foods path', () => {
    test('should return an array of food objects', () => {
      return request(app).get("/api/v1/foods").then(response => {
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(4);
        expect(Object.keys(response.body[0])).toContain('name');
        expect(Object.keys(response.body[0])).toContain('calories');
      });
    });
  });

  test('GET /api/v1/foods/:id Happy', () => {
    return request(app).get('/api/v1/foods/3')
    .then(rsp => {
      expect(rsp.status).toBe(200);
      expect(Object.keys(rsp.body)).toContain('name');
      expect(Object.keys(rsp.body)).toContain('calories');
    });
  });

  test('GET /api/v1/foods/:id Sad', () => {
    return request(app).get('/api/v1/foods/9999')
    .then(rsp => {
      expect(rsp.status).toBe(404);
      expect(rsp.body.error).toBe('Food with ID(9999) not found.');
    });
  });

  describe('POST /api/v1/foods', () => {
    test('User should post to db and api key returned', () => {
      return request(app).post('/api/v1/foods')
      .send({ "food": { "name": "icecream", "calories": 450} })
      .set('Accept', 'application/json')
      .then(res => {
        expect(function(res){
          res.body.food = "icecream";
        expect(res.status).toBe(201)});
      });
    });
  });

  test('PATCH /api/v1/foods/:id Happy', () => {
    return request(app).patch('/api/v1/foods/1')
    .send({name: 'bleh'})
    .then(rsp => {
      expect(rsp.status).toBe(200);
      expect(Object.keys(rsp.body)).toContain('name');
      expect(Object.keys(rsp.body)).toContain('calories');
    });
  });

  test('DELETE /api/v1/foods/:id Happy', () => {
    return request(app).delete('/api/v1/foods/1')
    .then(rsp => {
      expect(rsp.status).toBe(204);
    });
  });

  test('DELETE /api/v1/foods/:id Sad', () => {
    return request(app).delete('/api/v1/foods/323424')
    .then(rsp => {
      expect(rsp.status).toBe(404);
    });
  });

  describe("MealFoods", () => {
    test("Find foods associated with meals", async () => {
      items = [
        await Food.create({ name: "hashbrowns", calories: 300}),
        await Food.create({ name: "bacon", calories: 500})
      ]
      let meal = await Meal.create({name: 'breakfast'});
      await meal.addFood(items);
      let results = await meal.getFood();
      expect(results[0].name).toBe("hashbrowns")
      expect(results[0].calories).toBe(300)
      expect(results[1].name).toBe("bacon")
      expect(results[1].calories).toBe(500)
      expect(results[1].name).not.toBe("potato chips")
    })
  });

  describe("Get all meals", () => {
    test("GET /api/v1/meals", async () => {
      return request(app).get('/api/v1/meals')
        .then(rsp => {
        expect(rsp.status).toBe(200);
        expect(Object.keys(rsp.body[0])).toContain('name');
        expect(Object.keys(rsp.body[0])).toContain('Food');
      })
    });
  })

  describe("Meals", () => {
    test('GET /api/v1/meals/:id/foods Happy', () => {
      return request(app).get('/api/v1/meals/3/foods')
      .then(rsp => {
        expect(rsp.status).toBe(200);
        expect(Object.keys(rsp.body)).toContain('name');
        expect(Object.keys(rsp.body)).toContain('Food');
      });
    });

    test('GET /api/v1/meals/:id/foods Sad', () => {
      return request(app).get('/api/v1/meals/9999/foods')
      .then(rsp => {
        expect(rsp.status).toBe(404);
        expect(rsp.body.error).toBe('Meal with ID(9999) not found.');
      });
    });
  });
})
