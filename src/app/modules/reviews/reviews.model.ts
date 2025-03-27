import { model, Schema } from 'mongoose';
import { TReviews } from './reviews.interface';

const reviewSchema: Schema = new Schema<TReviews>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    review: {
      type: String,
      required: [true, 'Review is required'],
    },
  },
  {
    timestamps: true,
  },
);

export const Reviews = model<TReviews>('Reviews', reviewSchema);
