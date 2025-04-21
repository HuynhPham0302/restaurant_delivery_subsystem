export type TRegister = {
  email: string;
  password: string;
  fullName: string;
  username: string;
  phone_number: string;
  avatar?: string;
  address?: string;
  birth_date: string;
  gender: string;
};

export type TLogin = {
  email: string;
  password: string;
};
