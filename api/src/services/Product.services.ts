import slugify from 'slugify';
import prismaInstance from '../configs/database.config';
import { CreateProductDto } from '../dto/Product.dto';
import { Filter, Success } from '../utils/Response.utils';

class ProductServices {
  private productModel = prismaInstance.product;

  async create(data: CreateProductDto) {
    const product = await this.productModel.create({
      data: {
        name: data.name,
        description: data.description,
        brand: data.brand,
        image_cover: data.image_cover,
        sku: data.sku,
        meta: data.meta,
        slug: slugify(data.name, { lower: true }),
        category: {
          connect: {
            id: data.categoryId,
          },
        },
        items: {
          createMany: {
            data: data.items,
          },
        },
        images: {
          createMany: {
            data: data.image,
          },
        },
      },
    });

    return Success(product, null, 201, 'Product created successfully');
  }

  async get(pagination: Filter, query: any) {
    const products = await this.productModel.findMany({
      where: { is_deleted: false, ...query },
      skip: pagination.limit * (pagination.page - 1),
      take: pagination.limit,
      orderBy: {
        [pagination.order]: pagination.sort,
      },
      include: {
        items: true,
        images: true,
        category: true,
      },
    });

    const total = await this.productModel.count({
      where: query,
    });

    return Success(products, total, 200, 'Products retrieved successfully');
  }

  async getOne(id: number) {
    const product = await this.productModel.findUnique({
      where: {
        id,
        is_deleted: false,
      },
      include: {
        items: true,
        images: true,
      },
    });

    return Success(product, null, 200, 'Product retrieved successfully');
  }

  async update(id: number, data: CreateProductDto) {
    const product = await this.productModel.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        description: data.description,
        slug: data.name ? slugify(data.name, { lower: true }) : undefined,
        image_cover: data.image_cover,
        brand: data.brand,
        sku: data.sku,
        meta: data.meta,
        category: {
          connect: {
            id: data.categoryId,
          },
        },
      },
    });

    return Success(product, null, 200, 'Product updated successfully');
  }

  async delete(id: number) {
    await this.productModel.update({
      where: {
        id,
      },
      data: {
        is_deleted: true,
      },
    });

    return Success(null, null, 200, 'Product deleted successfully');
  }
}

export default new ProductServices();
