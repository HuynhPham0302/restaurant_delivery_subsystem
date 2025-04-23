import AuthService from '../services/Auth.services';
import { Request, Response } from 'express';

class AuthController {
  async getProfile(req: Request, res: Response) {
    const response = await AuthService.getProfile();
    console.dir(response, { depth: null });
    return res.status(response.status_code).json(response);
  }

  async register(req: Request, res: Response) {
    const data = req.body;
    const response = await AuthService.register(data);
    return res.status(response.status_code).json(response);
  }
}

export default new AuthController();
