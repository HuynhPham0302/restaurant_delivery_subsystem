import { z } from 'zod';

export type TRegister = {
  email: string;
  password: string;
  fullName: string;
  username: string;
  phone_number?: string;
  birth_date?: string;
  gender?: string;
  avatar?: string;
  address?: string;
};

export type TLogin = {
  email: string;
  password: string;
};

export const RegisterSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  fullName: z.string({ required_error: 'Full name is required' }),
  username: z.string({ required_error: 'Username is required' }),
  phone_number: z.string(),
  birth_date: z.string(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
