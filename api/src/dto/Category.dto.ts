import { z } from 'zod';

export type CreateCategoryDto = {
  name: string;
  description: string;
  image: string;
};

export type UpdateCategoryDto = {
  name?: string;
  description?: string;
  image?: string;
};

export const CreateCategorySchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  description: z.string({ required_error: 'Description is required' }),
  image: z.string({ required_error: 'Image is required' }),
});

export const UpdateCategorySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
});
