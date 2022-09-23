const express = require('express');
const restaurantsRouter = express.Router();

//Controllers
const {
  createReviews,
  updateReview,
  deleteReview,
} = require('../Controllers/reviews.controller');
const {
  createRestautant,
  getAllRestaurants,
  getRestaurantsById,
  updateRestaurant,
  deleteRestaurant,
} = require('../Controllers/restaurants.controllers');

//Middlewares
const {
  protectSession,
  protectAdmin,
  protectRestaurantsOwners
} = require('../Middlewares/aut.middlewares');

const { restaurantExits } = require('../Middlewares/restaurants.middlewares');

const {
  createRestaurantValidators,createReviewsValidator
} = require('../Middlewares/validadors.middewares');

const { reviewsExist } = require('../Middlewares/reviews.middlewares');

restaurantsRouter.get('/', getAllRestaurants);
restaurantsRouter.get('/:id', restaurantExits, getRestaurantsById);

restaurantsRouter.use(protectSession);

restaurantsRouter.post('/reviews/:restaurantId',createReviewsValidator ,createReviews);

restaurantsRouter.patch(
  '/:id',
  restaurantExits,
  protectAdmin,
  updateRestaurant
);
restaurantsRouter.delete(
  '/:id',
  restaurantExits,
  protectAdmin,
  deleteRestaurant
);
restaurantsRouter.post('/', createRestaurantValidators, createRestautant);
restaurantsRouter.patch(
  '/reviews/:id',
  protectAdmin,
  reviewsExist,
  protectRestaurantsOwners,
  updateReview
);
restaurantsRouter.delete(
  '/reviews/:id',
  protectAdmin,
  reviewsExist,
  deleteReview
);
module.exports = { restaurantsRouter };
