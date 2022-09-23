const { Reviews } = require('../Models/Reviews.models.js');
const { Restautants } = require('../Models/Restaurants.model');
const { catchAsync } = require('../Utils/cachtAsync.util');

const createRestautant = catchAsync(async (req, res, next) => {
  const { name, address, rating, status } = req.body;

  const newRestaurant = await Restautants.create({
    name,
    address,
    rating,
    status,
  });

  // 201 -> Success and a resource has been created
  res.status(201).json({
    status: 'success',
    data: { newRestaurant },
  });
});

const getAllRestaurants = catchAsync(async (req, res) => {
  const allRestaurants = await Restautants.findAll({
    where: { status: 'active' },

    include: [
      {
        model: Reviews,status: 'active'
        
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    data: {
      allRestaurants,
    },
  });
});

const getRestaurantsById = catchAsync(async (req, res) => {
  const { restaurant } = req;

  await restaurant;

  res.status(200).json({
    status: 'success',
    data: {
      restaurant,
    },
  });
});

const updateRestaurant = catchAsync(async (req, res) => {
    const { name, address } = req.body;
    const { restaurant } = req;
  
    // Method 1: Update by using the model
    // await User.update({ name }, { where: { id } });
  
    // Method 2: Update using a model's instance
    await restaurant.update({ name, address });
  
    res.status(200).json({
      status: 'success',
      data: { restaurant },
    });
  });
  
  const deleteRestaurant = catchAsync(async (req, res) => {
    const { restaurant } = req;
  
    // Method 1: Delete by using the model
    // User.destroy({ where: { id } })
  
    // Method 2: Delete by using the model's instance
    // await restaurant.destroy();
  
    // Method 3: Soft delete
    await restaurant.update({ status: 'deleted' });
  
    res.status(204).json({ status: 'success', data: 'restaurant deleted' });
  });
  


module.exports = { createRestautant, getAllRestaurants, getRestaurantsById,updateRestaurant,deleteRestaurant };
