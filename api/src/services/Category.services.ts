import prismaInstance from '../configs/database.config';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/Category.dto';
import { Filter, Success } from '../utils/Response.utils';

class CategoryService {
  private CategoryModel = prismaInstance.category;

  async create(data: CreateCategoryDto) {
    const category = await this.CategoryModel.create({
      data: {
        name: data.name,
        type: data.type,
        description: data.description,
        image: data.image,
      },
    });
    return Success(category, null, 201, 'Create category success');
  }

  async get(pagination: Filter, query: any) {
    const category = await this.CategoryModel.findMany({
      where: query,
      skip: pagination.limit * (pagination.page - 1),
      take: pagination.limit,
      orderBy: {
        [pagination.order]: pagination.sort,
      },
      include: {
        Product: true,
      },
    });

    const total = await this.CategoryModel.count({
      where: query,
    });
    return Success(category, total, 200, 'Get category success');
  }

  async getOne(id: number) {
    const category = await this.CategoryModel.findUnique({
      where: {
        id,
      },
    });
    return Success(category, null, 200, 'Get category success');
  }

  async update(id: number, data: UpdateCategoryDto) {
    const category = await this.CategoryModel.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
      },
    });
    return Success(category, null, 200, 'Update category success');
  }

  async delete(id: number) {
    const category = await this.CategoryModel.delete({
      where: {
        id,
      },
    });
    return Success(category, null, 200, 'Delete category success');
  }
}

export default new CategoryService();
