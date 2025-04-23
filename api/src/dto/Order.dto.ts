import { z } from 'zod';

export type createOrderDto = {
  user_id: number;
  total_price: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  postal_code: string;
  products: {
    product_item_id: number;
    quantity: number;
  }[];
};

export const createOrderSchema = z.object({
  user_id: z.number(),
  total_price: z.number(),
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  postal_code: z.string(),
  products: z.array(
    z.object({
      product_item_id: z.number(),
      quantity: z.number(),
    }),
  ),
});
