import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log(email, password);

    const token = await UserService.login();

    res.status(200).json({ token });
  }
}

export default UserController;
