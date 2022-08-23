import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../helpers/CustomError';
import UserService from '../services/UserService';

class UserController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const token = await UserService.login(email, password);

      return res.status(StatusCodes.OK).json(token);
    } catch (e) {
      const { status, message } = e as CustomError;
      console.log(e);
      return res.status(status).json({ message });
    }
  }

  static async validate(req: Request, res: Response) {
    try {
      const { email } = req.body.data;

      const role = await UserService.getRole(email);

      return res.status(StatusCodes.OK).json({ role });
    } catch (e) {
      const { status, message } = e as CustomError;
      console.log(e);
      return res.status(status).json({ message });
    }
  }
}

export default UserController;
