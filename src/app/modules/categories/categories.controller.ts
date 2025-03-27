import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { categoriesService } from './categories.service';

export const getAllCategories = catchAsync(async (req, res) => {
  const result = await categoriesService.getAllCategories();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Categories retrieved successfully',
    data: result,
  });
});

export const categoriesController = {
  getAllCategories,
};
