## Quantified Self

### Introduction

Quantified Self allows users to create foods and meals to keep track of calories. The backend is built in Node.js in an Express Framework and the front end ([which can be found here](link_to_front_end_repo_will_go_here)) is built in JavaScript using Webpack.

### Project Board

[Click Here to see the Quantifed Self Project Board](https://github.com/Myrdden/quantified-backend/projects/1)


### Initial Setup

* `$ git clone git@github.com:Myrdden/quantified-backend.git`
* `$ npm install`
* `$ npx sequelize db:migrate:all`
* `$ npx sequelize db:seed:all`

### Running Tests

* `$ npm test`

### How to Use

[Click Here to use Quantified Self](www.our_website.com)

As a user, you can get all foods or meals or request a single food or meal and its foods by ID. You can also create, update or delete foods, as well as add or remove certain foods to/from meals.

Here are the endpoints and example requests below:

For all foods:
`GET /api/v1/foods`

For all meals:
`GET /api/v1/meals`

For a single food:
`GET /api/v1/food/:id`

For a single meal with its foods:
`GET /api/v1/meals/:meal_id/foods`

To add a food:
```POST /api/v1/foods

{ "food": { "name": "Name of food here", "calories": "Calories here"} }
```

To add a food to a meal:
`POST /api/v1/meals/:meal_id/food/:id`

To update food:
```PATCH /api/v1/food/:id

{ "food": { "name": "Mint", "calories": "14"} }
```

And to delete food:
`DELETE /api/v1/food/:id`

To remove a food from a meal:
`DELETE /api/v1/meal/:meal_id/food/:id`

### Known Issues


### How to Contribute

If you'd like to contribute, fork and clone this repo, make your changes and submit a pull request. Tag one of us in it `Myrdden` or `@joripeterson` so we take a look at your code!

### Core Contributors

- [Aurie Gochenour](https://github.com/Myrdden)
- [Jori Peterson](https://github.com/JoriPeterson)


### Tech Stack List


### Schema Design
