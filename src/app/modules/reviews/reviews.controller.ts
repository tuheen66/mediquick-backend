import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { reviewsService } from './reviews.service';

const createReview = catchAsync(async (req, res) => {
  const review = await req.body;
  const result = await reviewsService.createReview(review);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Review create successfully',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const result = await reviewsService.getAllReviews();
  
  sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Reviews fetched successfully',
      data: result,
    });
});

export const reviewsController = {
  createReview,
  getAllReviews
};
