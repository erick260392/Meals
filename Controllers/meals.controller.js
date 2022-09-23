const { Meals } = require('../Models/Meals.models');

const { catchAsync } = require('../Utils/cachtAsync.util');

const createMeals = catchAsync(async (req, res) => {
  const { id } = req.params;
  const restaurantId = id;
  const { name, price } = req.body;

  const newMeals = await Meals.create({
    name,
    price,
    restaurantId,
  });

  // 201 -> Success and a resource has been created
  res.status(201).json({
    status: 'success',
    data: { newMeals },
  });
});

const getAllUserMeals = catchAsync(async (req, res) => {
  const meals = await Meals.findAll({
    where: { status: 'active' },
  });
  res.status(200).json({
    status: 'success',
    data: {
      meals,
    },
  });
});

const getMealsById = catchAsync(async (req, res) => {
  const { meals } = req;

  await meals;

  res.status(200).json({
    status: 'success',
    data: {
      meals,
    },
  });
});

const updateMeals = catchAsync(async (req, res) => {
  const { name, price } = req.body;
  const { meals } = req;

  // Method 1: Update by using the model
  // await price.update({ name }, { where: { id } });

  // Method 2: Update using a model's instance
  await meals.update({ name, price });

  res.status(200).json({
    status: 'success',
    data: { meals },
  });
});


const deleteMeals = catchAsync(async (req, res) => {
  const { meals } = req;

  // Method 1: Delete by using the model
  // meals.destroy({ where: { id } })

  // Method 2: Delete by using the model's instance
  // await meals.destroy();

  // Method 3: Soft delete
  await meals.update({ status: 'deleted' });

  res.status(204).json({ status: 'success', meals });
});

module.exports = { createMeals, getAllUserMeals, getMealsById, updateMeals ,deleteMeals};
