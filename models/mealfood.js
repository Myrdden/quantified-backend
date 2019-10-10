'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealFoods = sequelize.define('MealFoods', {
    foodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Food',
        key: 'id'
      }
    },
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Meals',
        key: 'id'
      }
    }
  });
  return MealFoods;
};
