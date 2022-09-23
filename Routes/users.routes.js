const express = require('express');

// Controllers
const {
  createUser,
  updateUser,
  deleteUser,
  login,
  getAllUsersWithOrders,
  getUsersbyIdWithOrders,
} = require('../Controllers/users.controller');

// Middlewares
const {
  createUserValidators,
} = require('../Middlewares/validadors.middewares');
const { userExists } = require('../Middlewares/users.middleware');

const {
  protectAdmin,
  protectUsersAccount,
  protectSession,
} = require('../Middlewares/aut.middlewares');

const usersRouter = express.Router();

usersRouter.post('/login', login);

usersRouter.post('/signup', createUserValidators, createUser);

// Protecting below endpoints
usersRouter.use(protectSession);

usersRouter.patch('/:id', userExists, protectUsersAccount, updateUser);

usersRouter.delete('/:id', userExists, protectUsersAccount, deleteUser);

usersRouter.get('/orders', getAllUsersWithOrders);

usersRouter.get(
  '/orders/:id',
  userExists,
  protectAdmin,
  getUsersbyIdWithOrders
);

module.exports = { usersRouter };
