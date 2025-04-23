import { TProduct_item } from './Product.types';
import { TUser } from './User.types';

export type TCartItem = {
  id: number;
  price: number;
  product_item: TProduct_item;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};

export type TCart = {
  id: number;
  user: TUser;
  CartItem: TCartItem[];
  createdAt: string;
  updatedAt: string;
};
