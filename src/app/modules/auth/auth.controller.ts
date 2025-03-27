/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import { OrderService } from '../order/order.service';

const register = catchAsync(async (req, res) => {
  const result = await authServices.register(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result
  });
});

const login = catchAsync(async (req, res) => {
  const result = await authServices.login(req.body);

  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User logged in successfully',
    data: { accessToken },
  });
});

const userProfile = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const result = await authServices.userProfile(token);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Customers profile fetched successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  const result = await authServices.updateUser(id, user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await authServices.getAllUsers();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Users fetched successfully',
    data: result,
  });
});

const blockUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization as string;
  const result = await authServices.blockUser(id, token);

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: StatusCodes.OK,
    data: null,
  });
});

export const AuthControllers = {
  register,
  login,
  userProfile,
  getAllUsers,
  updateUser,
  blockUser,
};
