export type TProduct_item = {
  id: string;
  type: string;
  price: number;
  description: string;
  is_discount: boolean;
  discount: number;
  stock: number;
  product: TProduct;
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
  image_cover: string;
  sku: string;
  brand: string;
  meta: {
    [key: string]: string;
  };
  slug: string;
  category: string;
  images: TProduct_image[];
  items: TProduct_item[];
  createdAt: string;
  updatedAt: string;
};
