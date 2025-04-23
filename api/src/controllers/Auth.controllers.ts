// Desc: Auth controller for handling requests and responses from Auth services

import { Request, Response } from 'express';
import AuthService from '../services/Auth.services';

class AuthController {
  async getProfile(req: Request, res: Response) {
    const response = await AuthService.getProfile();
    return res.status(response.status_code).json(response);
  }

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

  // Verify data user from google provider
  async googleProvider(req: Request, res: Response) {
    const user_data = req.user;
    const response = await AuthService.googleProvider(user_data);
    return res.status(response.status_code).json(response);
  }
}

export default new AuthController();
