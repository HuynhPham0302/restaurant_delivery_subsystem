import AuthService from '../services/Auth.services';
import { Request, Response } from 'express';

class AuthController {
  private authService!: AuthService;

  async getProfile(req: Request, res: Response) {
    console.log('ABC');
    const response = await this.authService.getProfile();
    return res.status(response.status_code).json(response);
  }

  async register(req: Request, res: Response) {
    const data = req.body;
    const response = await this.authService.register(data);
    return res.status(response.status_code).json(response);
  }
}

export default AuthController;
