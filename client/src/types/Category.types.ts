import { TProduct } from './Product.types';

export type TCategory = {
  id: number;
  name: string;
  Product: TProduct[];
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};
