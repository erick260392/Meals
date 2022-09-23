const express = require('express');

const { mealsRouter } = require('./Routes/meals.routes');
const { usersRouter } = require('./Routes/users.routes');
const { restaurantsRouter } = require('./Routes/restaurants.routes');
const { ordersRouter } = require('./Routes/orders.routes');

const { globalErrorHandler } = require('./Controllers/error.controller');
const app = express();

app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/orders', ordersRouter);

//  Global error handler
app.use(globalErrorHandler);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `${req.method} ${req.url} does not exists in this server`,
  });
});

module.exports = { app };
