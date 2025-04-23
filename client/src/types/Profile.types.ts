import { TUser } from './User.types';

export type TProfile = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  userId: number;
  user: TUser;
  provider: string;
  created_at: string;
  updated_at: string;
};
