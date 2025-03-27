import { TReviews } from './reviews.interface';
import { Reviews } from './reviews.model';

const createReview = async (review: TReviews) => {
  const result = await Reviews.create(review);
  return result;
};

const getAllReviews = async () => {
  const result = await Reviews.find();
  return result;
};

export const reviewsService = {
  createReview,
  getAllReviews,
};
