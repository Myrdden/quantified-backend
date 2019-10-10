'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealFoods = sequelize.define('MealFoods', {
    FoodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Food',
        key: 'id'
      }
    },
    MealId: {
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
