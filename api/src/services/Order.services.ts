import prismaInstance from '../configs/database.config';
import { createOrderDto } from '../dto/Order.dto';
import { Filter, Success } from '../utils/Response.utils';

class OrderService {
  private OrderModel = prismaInstance.order;

  async create(data: createOrderDto) {
    const order = await this.OrderModel.create({
      data: {
        user_id: data.user_id,
        total_price: data.total_price,
        fullName: data.fullName,
        phone_number: data.phone,
        address: data.address,
        postal_code: data.postal_code,
        email: data.email,
        OrderItem: {
          createMany: {
            data: data.products,
          },
        },
      },
    });

    return Success(order, null, 201, 'Order created successfully');
  }

  async getAll(pagination: Filter, query: any) {
    const orders = await this.OrderModel.findMany({
      where: query,
      skip: pagination.limit * (pagination.page - 1),
      take: pagination.limit,
      orderBy: {
        [pagination.order]: pagination.sort,
      },
      include: {
        OrderItem: {
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

    const total = await this.OrderModel.count({
      where: query,
    });

    return Success(orders, total, 200, 'Orders retrieved successfully');
  }

  async getOne(id: number) {
    const order = await this.OrderModel.findUnique({
      where: {
        id,
      },
      include: {
        OrderItem: {
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

    return Success(order, null, 200, 'Order retrieved successfully');
  }

  async update(id: number, data: createOrderDto) {
    const order = await this.OrderModel.update({
      where: {
        id,
      },
      data,
    });

    return Success(order, null, 200, 'Order updated successfully');
  }
}

export default new OrderService();
