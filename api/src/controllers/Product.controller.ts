import { Request, Response } from 'express';
import { CreateProductDto, CreateProductSchema } from '../dto/Product.dto';
import ProductServices from '../services/Product.services';
import { ValidationData } from '../utils/Validation.utils';
import { dataFilter } from '../utils/Response.utils';

class ProductController {
  async create(req: Request, res: Response) {
    const validate = await ValidationData<CreateProductDto>(req.body, CreateProductSchema);
    const response = await ProductServices.create(validate);
    return res.status(response.status_code).json(response);
  }

  async get(req: Request, res: Response) {
    const { filter, query } = dataFilter(req.query);
    const response = await ProductServices.get(filter, query);
    return res.status(response.status_code).json(response);
  }

  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const response = await ProductServices.getOne(id);
    return res.status(response.status_code).json(response);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const validate = await ValidationData<CreateProductDto>(req.body, CreateProductSchema);
    const response = await ProductServices.update(id, validate);
    return res.status(response.status_code).json(response);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const response = await ProductServices.delete(id);
    return res.status(response.status_code).json(response);
  }
}

export default new ProductController();
