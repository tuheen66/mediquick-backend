import { Categories } from './categories.model';

export const getAllCategories = async () => {
  const result = await Categories.find();
  return result;
};



export const categoriesService={
    getAllCategories
}
