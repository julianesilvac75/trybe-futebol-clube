import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await UserService.login(email, password);

    res.status(200).json(token);
  }
}

export default UserController;
