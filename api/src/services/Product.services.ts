import slugify from 'slugify';
import prismaInstance from '../configs/database.config';
import { CreateProductDto, UpdateProductDto } from '../dto/Product.dto';
import { Success } from '../utils/Response.utils';

class ProductServices {
  private productModel = prismaInstance.product;

  async create(data: CreateProductDto) {
    const product = await this.productModel.create({
      data: {
        name: data.name,
        description: data.description,
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

    return Success(product, 201, 'Product created successfully');
  }

  async get() {
    const products = await this.productModel.findMany({
      include: {
        items: true,
        images: true,
        category: true,
      },
    });

    return Success(products, 200, 'Products retrieved successfully');
  }

  async getOne(id: number) {
    const product = await this.productModel.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
        images: true,
        category: true,
      },
    });

    return Success(product, 200, 'Product retrieved successfully');
  }

  async update(id: number, data: UpdateProductDto) {
    const product = await this.productModel.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        description: data.description,
        slug: data.name ? slugify(data.name, { lower: true }) : undefined,
        category: {
          connect: {
            id: data.categoryId,
          },
        },
        items: {
          createMany: {
            data: data.items!,
          },
        },
        images: {
          createMany: {
            data: data.image!,
          },
        },
      },
    });

    return Success(product, 200, 'Product updated successfully');
  }

  async delete(id: number) {
    await this.productModel.delete({
      where: {
        id,
      },
    });

    return Success(null, 200, 'Product deleted successfully');
  }
}

export default new ProductServices();
