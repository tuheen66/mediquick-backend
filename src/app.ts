import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorhandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

import { AuthRoutes } from './app/modules/auth/auth.route';
import { MedicineRoutes } from './app/modules/medicines/medicine.route';
import { OrderRoutes } from './app/modules/order/order.route';
import { CategoriesRoutes } from './app/modules/categories/categories.route';
import { ReviewsRoutes } from './app/modules/reviews/reviews.route';

const app: Application = express();

//parser

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use('/api/auth', AuthRoutes);
app.use('/api/medicine', MedicineRoutes);
app.use('/api/order', OrderRoutes);
app.use('/api/categories', CategoriesRoutes);
app.use('/api/reviews', ReviewsRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server is running 🏃‍♂️',
  });
});

app.use(globalErrorhandler);
app.use(notFound);

export default app;
