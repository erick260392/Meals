const express = require('express');

//Controllers
const {
  createOrders,
  getAllOrders,
  updateOrder,
  deleteOrder

} = require('../Controllers/orders.controller');

//Middlewares
const {
protectOrdersOwners,
  protectSession,
} = require('../Middlewares/aut.middlewares');
const { orderExits } = require('../Middlewares/orders.middlewares');

//Router Express
const ordersRouter = express.Router();

//Use Protect Session for this end-points
ordersRouter.use(protectSession);

//define end-points
ordersRouter.post('/', createOrders);

ordersRouter.get('/me', getAllOrders);

ordersRouter.patch('/:id', orderExits, protectOrdersOwners,updateOrder);

ordersRouter.delete('/:id', orderExits, protectOrdersOwners,deleteOrder);

module.exports = { ordersRouter };
