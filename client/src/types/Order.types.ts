import { TProduct_item } from './Product.types';

export type TOrder_item = {
  id: number;
  product_item: TProduct_item;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};

export type TOrder = {
  id: number;
  OrderItem: TOrder_item[];
  total: number;
  total_price: number;
  fullName: string;
  phone_number: string;
  postal_code: string;
  address: string;
  status: 'pending' | 'completed' | 'canceled';
  createdAt: string;
  updatedAt: string;
};
