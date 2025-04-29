import { TUser } from './User.types';

export type TProfile = {
  id: number;
  email: string;
  is_blocked: boolean;
  is_deleted: boolean;
  provider: string;
  role: string;
  user: TUser;
  avatar: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};
