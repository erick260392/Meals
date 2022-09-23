// Models
const { Orders } = require('../Models/Orders.models');
const { AppError } = require('../Utils/appError.util');
const { catchAsync } = require('../Utils/cachtAsync.util');

const orderExits = catchAsync(async (req, res, next) => {
  const { id } = req.params;



  const order = await Orders.findOne({
    where: { id, status: 'active' },

  
  });


  // If orders doesn't exist, send error message
  if (!order) {
    return next(AppError('order not found', 404));

    // return res.status(404).json({
    // 	status: 'error',
    // 	message: 'order not found',
    // });
  }

  // req.anyPropName = 'anyValue'
  req.order = order;
  next();
});

module.exports = {
  orderExits,
};
