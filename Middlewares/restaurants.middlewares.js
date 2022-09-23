// Models
const { Restautants } = require('../Models/Restaurants.model');
const { Reviews } = require('../Models/Reviews.models');
const { AppError } = require('../Utils/appError.util');
const { catchAsync } = require('../Utils/cachtAsync.util');

const restaurantExits = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restautants.findOne({
    where: { id, status: 'active' },

    include: [
      {
        model: Reviews,
       
      },
    ],
  });

  // If reviews doesn't exist, send error message
  if (!restaurant) {
    return next(AppError('restaurant not found', 404));

    // return res.status(404).json({
    // 	status: 'error',
    // 	message: 'restaurant not found',
    // });
  }

  // req.anyPropName = 'anyValue'
  req.restaurant = restaurant;
  next();
});

module.exports = {
  restaurantExits,
};
