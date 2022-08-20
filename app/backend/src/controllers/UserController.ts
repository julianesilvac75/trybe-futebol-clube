/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
// import UserService from '../services/UserService';
// import User from '../database/models/UserModel';
import IUserService from '../interfaces/IUserService';

class UserController {
  constructor(public userService: IUserService<string>) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log(email, password);
    console.log('Aqui é a userController');

    const token = await this.userService.list();
    console.log('Aqui é a userController2');

    res.status(200).json({ token });
  }

  async teste(req: Request, res: Response) {
    const users = await this.userService.list();
    // const [users] = await User.findAll();
    console.log(users);

    res.status(200).json({ users });
  }
}

export default UserController;
