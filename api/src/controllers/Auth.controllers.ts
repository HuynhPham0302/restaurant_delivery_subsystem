// Desc: Auth controller for handling requests and responses from Auth services

import { Request, Response } from 'express';
import { RegisterSchema, TRegister } from '../dto/Auth.dto';
import AuthService from '../services/Auth.services';
import { TJwtPayload } from '../utils/Jwt.utils';
import { ValidationData } from '../utils/Validation.utils';
import { dataFilter } from '../utils/Response.utils';

class AuthController {
  async register(req: Request, res: Response) {
    const data = await ValidationData<TRegister>(req.body, RegisterSchema);
    const response = await AuthService.register(data);
    return res.status(response.status_code).json(response);
  }

  async login(req: Request, res: Response) {
    const data = req.body;
    const response = await AuthService.login(data);
    return res.status(response.status_code).json(response);
  }

  async me(req: Request, res: Response) {
    const response = await AuthService.me(req.user);
    return res.status(response.status_code).json(response);
  }

  // Verify data user from google provider
  async googleProvider(req: Request, res: Response) {
    const user_data = req.user as TJwtPayload;
    const response = await AuthService.googleProvider(user_data);
    return res.status(response.status_code).json(response);
  }

  async getAllUser(req: Request, res: Response) {
    const { filter, query } = dataFilter(req.query);
    const response = await AuthService.getAllUser(filter, query);
    return res.status(response.status_code).json(response);
  }

  async updateUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const response = await AuthService.updateUser(id, req.body);
    return res.status(response.status_code).json(response);
  }
}

export default new AuthController();
