export type TProduct_item = {
  id: string;
  type: string;
  price: number;
  description: string;
  is_discount: boolean;
  discount: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
};

export type TProduct_image = {
  id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
};

export type TProduct = {
  id: string;
  name: string;
  description: string;
  meta: string;
  slug: string;
  category: string;
  images: TProduct_image[];
  items: TProduct_item[];
  createdAt: string;
  updatedAt: string;
};
