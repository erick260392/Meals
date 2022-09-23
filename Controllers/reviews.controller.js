const { Reviews } = require('../Models/Reviews.models.js');
const { catchAsync } = require('../Utils/cachtAsync.util');

const createReviews = catchAsync(async (req, res) => {
  const { sessionUser } = req;
  const { restaurantId } = req.params;
  const userId = sessionUser.id;

  const { comment, rating } = req.body;

  const newReviews = await Reviews.create({
    comment,
    restaurantId,
    rating,
    userId,
  });

  // 201 -> Success and a resource has been created
  res.status(201).json({
    status: 'success',
    data: { newReviews },
  });
});

const updateReview = catchAsync(async (req, res) => {

  const { comment, rating } = req.body;
  const { review } = req;

  // Method 1: Update by using the model
  // await review.update({ name }, { where: { id } });

  // Method 2: Update using a model's instance
  await review.update({ comment, rating });

  res.status(200).json({
    status: 'success',
    data: { review },
  });
});

const deleteReview = catchAsync(async (req, res) => {
  const { review } = req;

  // Method 1: Delete by using the model
  // review.destroy({ where: { id } })

  // Method 2: Delete by using the model's instance
  // await review.destroy();

  // Method 3: Soft delete
  await review.update({ status: 'deleted' });

  res.status(204).json({ status: 'success', message: 'user deleted' });
});

module.exports = { createReviews, updateReview, deleteReview };
