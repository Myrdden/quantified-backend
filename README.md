## Quantified Self

### Introduction

Quantified Self allows users to create foods and meals to keep track of calories. The backend is built in Node.js in an Express Framework and the frontend ([which can be found here](http://github.com/Myrdden/quantified-frontend)) is built in JavaScript using Webpack.

### Project Board

[Click Here to see the Quantified Self Project Board](https://github.com/Myrdden/quantified-backend/projects/1)

### Core Contributors

- [Aurie Gochenour](https://github.com/Myrdden)
- [Jori Peterson](https://github.com/JoriPeterson)


### Built Using

* Express 4.16.1
* Node.js 10.16.3
* PostgreSQL Database
* Sequelize
* Jest
* TravisCI

### Initial Setup

* `$ git clone git@github.com:Myrdden/quantified-backend.git`
* `$ npm install`
* `$ npx sequelize db:migrate:all`
* `$ npx sequelize db:seed:all`

### Running Tests

Tests for quantified-backend are built using Jest. To run the test suite run:

* `$ npm test`

### How to Use

As a user, you can get all foods or meals or request a single food or meal and its foods by ID. You can also create, update or delete foods, as well as add or remove certain foods to/from meals. An additional endpoint has been added to find the most popular food across all meals.

For the backend version:
[Click Here to use Quantified Self](https://this-quantified-backend.herokuapp.com/)

For the frontend version:
[Click Here to use Quantified Self](https://this-quantified-self.herokuapp.com/)


Here are endpoints and example requests/responses below:

For all foods:
`GET /api/v1/foods`

Example Response:

```
[{
    "id": 1,
    "name": "Banana",
    "calories": 150
},
{
  "id": 2,
    "name": "Apple",
    "calories": 100
}]
```

For all meals:
`GET /api/v1/meals`

Example Response:

```
[
    {
        "id": 1,
        "name": "Breakfast",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 6,
                "name": "Yogurt",
                "calories": 550
            },
            {
                "id": 12,
                "name": "Apple",
                "calories": 220
            }
        ]
    },
    {
        "id": 2,
        "name": "Snack",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 9,
                "name": "Gum",
                "calories": 50
            },
            {
                "id": 10,
                "name": "Cheese",
                "calories": 400
            }
        ]
    },
    {
        "id": 3,
        "name": "Lunch",
        "foods": [
            {
                "id": 2,
                "name": "Bagel Bites - Four Cheese",
                "calories": 650
            },
            {
                "id": 3,
                "name": "Chicken Burrito",
                "calories": 800
            },
            {
                "id": 12,
                "name": "Apple",
                "calories": 220
            }
        ]
    },
    {
        "id": 4,
        "name": "Dinner",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 2,
                "name": "Bagel Bites - Four Cheese",
                "calories": 650
            },
            {
                "id": 3,
                "name": "Chicken Burrito",
                "calories": 800
            }
        ]
    }
]
```

For a single food:
`GET /api/v1/food/:id`

Example Response:

```
{
    "id": 1,
    "name": "Banana",
    "calories": 150
}
```

For a single meal with its foods:
`GET /api/v1/meals/:meal_id/foods`

Example Response:

```
{
    "id": 1,
    "name": "Breakfast",
    "foods": [
        {
            "id": 1,
            "name": "Banana",
            "calories": 150
        },
        {
            "id": 6,
            "name": "Yogurt",
            "calories": 550
        },
        {
            "id": 12,
            "name": "Apple",
            "calories": 220
        }
    ]
}
```

To add a food:
`POST /api/v1/foods`

Example Request:
```
{ "food": { "name": "Chocolate Chip Cookies", "calories": "400"} }
```

Example Response:
```
{
    "id": 10,
    "name": "Chocolate Chip Cookies",
    "calories": 400
}
```

To add a food to a meal:
`POST /api/v1/meals/:meal_id/food/:id`

Example Response:
```
{
    "message": "Successfully added FOODNAME to MEALNAME"
}
```

To update food:
`PATCH /api/v1/food/:id`

Example Request:
```
{ "food": { "name": "Mint", "calories": "14"} }
```

Example Response:
```
{
    "id": 12,
    "name": "Mint",
    "calories": 14
}
```

To delete food:
`DELETE /api/v1/food/:id`

If successful, this request will return a 204 status code

To remove a food from a meal:
`DELETE /api/v1/meal/:meal_id/food/:id`

If successful, this request will return a 204 status code

To retrieve most popular food across all meals:
`GET /api/v1/meals/most_popular_food`

Example Response:
```
{
    "id": 1,
    "name": "chocolate chip cookies",
    "calories": 500,
    "createdAt": "2019-10-13T23:20:27.075Z",
    "updatedAt": "2019-10-14T00:35:06.209Z"
}

```

### Schema Design

![quantified_self schema](/qs_schema_diagram.png?raw=true "Quantified Self")


### How to Contribute

If you'd like to contribute, fork and clone this repo, make your changes and submit a pull request. Tag one of us in it `@Myrdden` or `@joripeterson` so we take a look at your code!
