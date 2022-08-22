import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorMessages from '../helpers/ErrorMessages';
import UserService from '../services/UserService';

class UserController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const token = await UserService.login(email, password);

      return res.status(StatusCodes.OK).json(token);
    } catch (error) {
      console.error(error);
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: ErrorMessages.incorrectField });
    }
  }
}

export default UserController;
