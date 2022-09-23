const { Meals } = require('../Models/Meals.models');
const { AppError } = require('../Utils/appError.util');
const { catchAsync } = require('../Utils/cachtAsync.util');

const mealsExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meals = await Meals.findOne({
    where: { id, status: 'active' },
  });

  // If meals doesn't exist, send error message
  if (!meals) {
    return next(AppError('meals not found', 404));

    // return res.status(404).json({
    // 	status: 'error',
    // 	message: 'meals not found',
    // });
  }

  // req.anyPropName = 'anyValue'
  req.meals = meals;
  next();
});

module.exports = {
  mealsExists,
};
