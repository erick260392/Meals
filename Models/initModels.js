const { Meals } = require('./Meals.models');
const { Orders } = require('./Orders.models');
const { Restautants } = require('./Restaurants.model');
const { Users } = require('./Users.models');
const { Reviews } = require('../Models/Reviews.models');

const initModels = () => {
  //1 Restaurant <-----> M meals
  Restautants.hasMany(Meals, { foreignKey: 'restaurantId' });
  Meals.belongsTo(Restautants);

  //1 Meals <----> 1 Order
  Meals.hasOne(Orders, {
    foreignKey: 'mealId',
  });
  Orders.belongsTo(Meals);

    //1 Users <-----> M orders

    Users.hasMany(Orders, { foreignKey: 'userId' });
    Orders.belongsTo(Users);

  //1 Restaurants <----> M Reviews

  Restautants.hasMany(Reviews, { foreignKey: 'restaurantId' });
  Reviews.belongsTo(Restautants);

      //1 Users <-----> M Reviews

      Users.hasMany(Reviews, { foreignKey: 'userId' });
      Reviews.belongsTo(Users);
};

module.exports = { initModels };
