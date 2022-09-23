const { Orders } = require('../Models/Orders.models');
const { Restautants } = require('../Models/Restaurants.model');
const { Meals } = require('../Models/Meals.models');
const { catchAsync } = require('../Utils/cachtAsync.util');
const { AppError } = require('../Utils/appError.util');

const getAllOrders = catchAsync(async (req, res) => {
  const { sessionUser } = req;

  const userId = sessionUser.id;

  const orders = await Orders.findAll({
    where: { userId, status: 'active' },
    include: [
      {
        required: false,
        status: 'active',
        model: Meals,
        include: { model: Restautants, required: false, status: 'active' },
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    data: {
      orders,
    },
  });
});

const createOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { quantity, mealId } = req.body;

  //get data for create new order
  const userId = sessionUser.id;
  const id = mealId;

  // Find if meals exist
  const mealfind = await Meals.findOne({
    where: { id, status: 'active' },
  });

  // If meals doesn't exist, send error message
  if (!mealfind) {
    return next(AppError('meals not found', 404));
  }

  //caculate total price
  const totalPrice = quantity * mealfind.price;

  // create new Order
  const newOrder = await Orders.create({
    mealId,
    userId,
    totalPrice,
    quantity,
  });

  // 201 -> Success and a resource has been created
  res.status(201).json({
    status: 'success',
    data: { newOrder },
  });
});


const updateOrder = catchAsync(async (req, res) => {

  const { order } = req;

  // Method 1: Update by using the model
  // await order.update({ name }, { where: { id } });

  // Method 2: Update using a model's instance
  await order.update({ status: 'completed' });

  res.status(200).json({
    status: 'success',
    data: { order },
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { order } = req;

  // Method 1: Delete by using the model
  // order.destroy({ where: { id } })

  // Method 2: Delete by using the model's instance
  // await order.destroy();

  // Method 3: Soft delete
  await order.update({ status: 'cancelled' });


  res.status(204).json({ status: 'success',data: { order } });
});

module.exports = { getAllOrders, createOrders,updateOrder,deleteOrder };
