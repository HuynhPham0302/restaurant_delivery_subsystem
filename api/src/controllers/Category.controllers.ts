import { Request, Response } from 'express';
import { ValidationData } from '../utils/Validation.utils';
import { CreateCategoryDto, CreateCategorySchema, UpdateCategoryDto, UpdateCategorySchema } from '../dto/Category.dto';
import CategoryService from '../services/Category.services';
import { dataFilter } from '../utils/Response.utils';

class CategoryController {
  async create(req: Request, res: Response) {
    const validate = await ValidationData<CreateCategoryDto>(req.body, CreateCategorySchema);
    const response = await CategoryService.create(validate);
    return res.status(response.status_code).json(response);
  }

  async get(req: Request, res: Response) {
    const { filter, query } = dataFilter(req.query);
    const response = await CategoryService.get(filter, query);
    return res.status(response.status_code).json(response);
  }

  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const response = await CategoryService.getOne(id);
    return res.status(response.status_code).json(response);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const validate = await ValidationData<UpdateCategoryDto>(req.body, UpdateCategorySchema);
    const response = await CategoryService.update(id, validate);
    return res.status(response.status_code).json(response);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const response = await CategoryService.delete(id);
    return res.status(response.status_code).json(response);
  }
}

export default new CategoryController();
