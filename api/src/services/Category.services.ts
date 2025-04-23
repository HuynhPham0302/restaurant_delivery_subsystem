import prismaInstance from '../configs/database.config';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/Category.dto';
import { Success } from '../utils/Response.utils';

class CategoryService {
  private CategoryModel = prismaInstance.category;

  async create(data: CreateCategoryDto) {
    const category = await this.CategoryModel.create({
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
      },
    });
    return Success(category, 201, 'Create category success');
  }

  async get() {
    const category = await this.CategoryModel.findMany();
    return Success(category, 200, 'Get category success');
  }

  async getOne(id: number) {
    const category = await this.CategoryModel.findUnique({
      where: {
        id,
      },
    });
    return Success(category, 200, 'Get category success');
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
    return Success(category, 200, 'Update category success');
  }

  async delete(id: number) {
    const category = await this.CategoryModel.delete({
      where: {
        id,
      },
    });
    return Success(category, 200, 'Delete category success');
  }
}

export default new CategoryService();
