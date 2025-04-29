import { TUser } from './User.types';

export type TProfile = {
  id: string;
  email: string;
  is_blocked: boolean;
  is_deleted: boolean;
  provider: string;
  role: string;
  user: TUser;
  createdAt: string;
  updatedAt: string;
};
