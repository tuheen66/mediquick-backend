import { model, Schema } from 'mongoose';
import { TCategories } from './categories.interface';

const categoriesSchema: Schema = new Schema<TCategories>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  icon: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const Categories = model<TCategories>('Categories', categoriesSchema);
