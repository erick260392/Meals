const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { Users } = require('../Models/Users.models');
const { Orders } = require('../Models/Orders.models');

const { AppError } = require('../Utils/appError.util');

const { catchAsync } = require('../Utils/cachtAsync.util');

dotenv.config({ path: './config.env' });

const getAllUsersWithOrders = catchAsync(async (req, res) => {
  const users = await Users.findAll({
    attributes: { exclude: ['password'] },
    where: { status: 'active' },
    include: [
      {
        model: Orders,
        required: false,
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

const getUsersbyIdWithOrders = catchAsync(async (req, res) => {
  const { user } = req;

  await user;

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (role !== 'admin' && role !== 'normal') {
    return next(new AppError('Invalid role', 400));
  }

  // Encrypt the password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await Users.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // Remove password from response
  newUser.password = undefined;

  // 201 -> Success and a resource has been created
  res.status(201).json({
    status: 'success',
    data: { newUser },
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { name, email } = req.body;
  const { user } = req;

  // Method 1: Update by using the model
  // await User.update({ name }, { where: { id } });

  // Method 2: Update using a model's instance
  await user.update({ name, email });

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { user } = req;

  // Method 1: Delete by using the model
  // User.destroy({ where: { id } })

  // Method 2: Delete by using the model's instance
  // await user.destroy();

  // Method 3: Soft delete
  await user.update({ status: 'deleted' });

  res.status(204).json({ status: 'success', message: 'user deleted' });
});

const login = catchAsync(async (req, res, next) => {
  // Get email and password from req.body
  const { email, password } = req.body;

  // Validate if the user exist with given email
  const user = await Users.findOne({
    where: { email, status: 'active' },
  });

  // Compare passwords (entered password vs db password)
  // If user doesn't exists or passwords doesn't match, send error
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(AppError('Wrong credentials', 400));
    // return res.status(400).json({
    // 	status: 'error',
    // 	message: 'Wrong credentials',
    // });
  }

  // Remove password from response
  user.password = undefined;

  // Generate JWT (payload, secretOrPrivateKey, options)
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({
    status: 'success',
    data: { user, token },
  });
});

module.exports = {
  getAllUsersWithOrders,
  getUsersbyIdWithOrders,
  createUser,
  updateUser,
  deleteUser,
  login,
};
