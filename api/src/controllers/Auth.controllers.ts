// Desc: Auth controller for handling requests and responses from Auth services

import { Request, Response } from 'express';
import AuthService from '../services/Auth.services';
import { TJwtPayload } from '../utils/Jwt.utils';

class AuthController {
  async register(req: Request, res: Response) {
    const data = req.body;
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
}

export default new AuthController();
