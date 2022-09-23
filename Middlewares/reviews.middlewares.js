const { Reviews } = require('../Models/Reviews.models');
const { AppError } = require('../Utils/appError.util');
const { catchAsync } = require('../Utils/cachtAsync.util');

const reviewsExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  console.log(id)
  const review = await Reviews.findOne({
    where: {id},
  });

  // If review doesn't exist, send error message
  if (!review) {
    return next(AppError('review not found', 404));

    // return res.status(404).json({
    // 	status: 'error',
    // 	message: 'review not found',
    // });
  }

  // req.anyPropName = 'anyValue'
  req.review = review;
  next();
});

module.exports = {
  reviewsExist,
};
