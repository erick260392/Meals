const express = require('express');

//Controllers

const {
  createMeals,
  getAllUserMeals,
  getMealsById,
  updateMeals,
  deleteMeals,
} = require('../Controllers/meals.controller');

// Middlewares
const {
  protectSession,
  protectAdmin,
} = require('../Middlewares/aut.middlewares');

const { mealsExists } = require('../Middlewares/meals.middlewares');

const {
  createMealsValidators,
} = require('../Middlewares/validadors.middewares');

//Router Express
const mealsRouter = express.Router();

mealsRouter.get('/', getAllUserMeals);
mealsRouter.get('/:id', mealsExists, getMealsById);

// Protecting below endpoints
mealsRouter.use(protectSession);

mealsRouter.post('/:id', createMealsValidators, createMeals);

mealsRouter.patch('/:id', mealsExists, protectAdmin, updateMeals);

mealsRouter.delete('/:id', mealsExists, protectAdmin, deleteMeals);

module.exports = { mealsRouter };
