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

  async googleProvider(req: Request, res: Response) {
    // const response = await AuthService.googleProvider();
    return res.redirect('http://localhost:5173/');
  }
}

export default new AuthController();
