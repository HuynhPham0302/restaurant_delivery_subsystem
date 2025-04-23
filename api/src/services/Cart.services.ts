import prismaInstance from '../configs/database.config';
import { CreateCartDto } from '../dto/Cart.dto';
import { Filter, Success } from '../utils/Response.utils';

class CartServices {
  private cartModel = prismaInstance.cart;

  async create(data: CreateCartDto) {
    const cart = await this.cartModel.create({
      data: {
        user_id: data.user_id,
        CartItem: {
          create: {
            product_item_id: data.product_item_id,
            quantity: data.quantity,
          },
        },
      },
    });

    return Success(cart, null, 201, 'Cart created successfully');
  }

  async get(pagination: Filter, query: any) {
    const carts = await this.cartModel.findMany({
      where: query,
      skip: pagination.limit * (pagination.page - 1),
      take: pagination.limit,
      orderBy: {
        [pagination.order]: pagination.sort,
      },
      include: {
        CartItem: {
          include: {
            product_item: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    const total = await this.cartModel.count({
      where: query,
    });

    return Success(carts, total, 200, 'Cart fetched successfully');
  }

  async getOne(id: number) {
    const cart = await this.cartModel.findUnique({
      where: {
        id,
      },
      include: {
        CartItem: {
          include: {
            product_item: {
              include: {
                product: {
                  include: {
                    images: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return Success(cart, null, 200, 'Cart fetched successfully');
  }

  async addCartItem(id: number, data: CreateCartDto) {
    const cart = await this.cartModel.findUnique({
      where: {
        id,
      },
      include: {
        CartItem: true,
      },
    });

    if (!cart) {
      throw new Error('Cart not found');
    }

    const product_existed = cart.CartItem.find((item) => item.product_item_id === data.product_item_id);
    if (product_existed) {
      await this.cartModel.update({
        where: {
          id,
        },
        data: {
          CartItem: {
            update: {
              where: {
                id: product_existed.id,
              },
              data: {
                quantity: product_existed.quantity + data.quantity,
              },
            },
          },
        },
      });
    } else {
      await this.cartModel.update({
        where: {
          id,
        },
        data: {
          CartItem: {
            create: {
              product_item_id: data.product_item_id,
              quantity: data.quantity,
            },
          },
        },
      });
    }
    return Success(null, null, 200, 'Cart item added successfully');
  }
}

export default new CartServices();
