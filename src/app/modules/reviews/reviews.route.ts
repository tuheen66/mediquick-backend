import express from 'express';
import { reviewsController } from './reviews.controller';



const router = express.Router();


router.post('/', reviewsController.createReview);

router.get('/', reviewsController.getAllReviews);


export const ReviewsRoutes = router;