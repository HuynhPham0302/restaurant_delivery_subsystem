import { z } from 'zod';

type item_product = {
  description: string;
  type: string;
  price: number;
  is_discount: boolean;
  discount: number;
  stock: number;
};

type image_product = {
  url: string;
};

export type CreateProductDto = {
  name: string;
  description: string;
  categoryId: number;
  items: item_product[];
  image: image_product[];
};

export type UpdateProductDto = {
  name?: string;
  description?: string;
  categoryId?: number;
  items?: item_product[];
  image?: image_product[];
};

export const CreateProductSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  description: z.string({ required_error: 'Description is required' }),
  categoryId: z.number({ required_error: 'Category is required' }),
  image: z.array(
    z.object({
      url: z.string({ required_error: 'Url is required' }),
    }),
  ),
  items: z.array(
    z.object({
      type: z.string({ required_error: 'Type is required' }),
      description: z.string({ required_error: 'Description is required' }),
      price: z.number({ required_error: 'Price is required' }),
      stock: z.number({ required_error: 'Stock is required' }),
      is_discount: z.boolean().optional(),
      discount: z.number().optional(),
    }),
  ),
});

export const UpdateProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.number().optional(),
  image: z
    .array(
      z.object({
        url: z.string().optional(),
      }),
    )
    .optional(),
  items: z
    .array(
      z.object({
        type: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
        stock: z.number().optional(),
        is_discount: z.boolean().optional(),
        discount: z.number().optional(),
      }),
    )
    .optional(),
});
