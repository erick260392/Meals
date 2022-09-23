// Models
const { Users } = require('../Models/Users.models');
const { Orders } = require('../Models/Orders.models');
const { AppError } = require('../Utils/appError.util');
const { catchAsync } = require('../Utils/cachtAsync.util');

const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await Users.findOne({
    attributes: { exclude: ['password'] },
    where: { id, status: 'active' },

    include: [
      {
        required: false,
        model: Orders,
      },
    ],
  });

  // If user doesn't exist, send error message
  if (!user) {
    return next(AppError('User not found', 404));

    // return res.status(404).json({
    // 	status: 'error',
    // 	message: 'User not found',
    // });
  }

  // req.anyPropName = 'anyValue'
  req.user = user;
  next();
});

module.exports = {
  userExists,
};
