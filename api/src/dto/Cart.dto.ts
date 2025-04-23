import { z } from 'zod';

export type CreateCartDto = {
  user_id: number;
  product_item_id: number;
  quantity: number;
};

export const CreateCartSchema = z.object({
  user_id: z.number({ required_error: 'User is required' }),
  product_item_id: z.number({ required_error: 'Product Item is required' }),
  quantity: z.number({ required_error: 'Quantity is required' }),
});

export const UpdateCartSchema = z.object({
  user_id: z.number().optional(),
  product_item_id: z.number().optional(),
  quantity: z.number().optional(),
});
