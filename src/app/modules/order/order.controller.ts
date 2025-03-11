import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { OrderService } from './order.service';

export const createOrder = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Unauthorized: No token provided.',
    });
    return;
  }

  const medicineData = req.body;

  const result = await OrderService.createOrder(medicineData, token);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order is created successfully!',
    data: result,
  });
});

const createPaymentIntent = catchAsync(async (req, res) => {
  const { totalPrice } = req.body;
  const clientSecret =
    await OrderService.createPaymentIntentService(totalPrice);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment secret created successfully',
    data: clientSecret,
  });
});

export const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderService.getAllOrders();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await OrderService.getSingleOrder(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Medicine fetched successfully',
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await OrderService.updateOrderStatus(id, status);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'order status updated successfully',
    data: result,
  });
});

export const getUserOwnOrders = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const email = req.params.email;

  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Unauthorized: No token provided.',
    });
    return;
  }

  const result = await OrderService.userOwnOrder(token, email);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Orders fetched successfully!',
    data: result,
  });
});


const getSingleUserOrders=catchAsync(async(req, res)=>{

  const user = req.params.user
  const result = await OrderService.getSingleUserOrders(user)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: ' Users orders fetched successfully',
    data: result,
  });
})

export const OrderController = {
  createOrder,
  createPaymentIntent,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  getUserOwnOrders,
  getSingleUserOrders
};
