/* eslint-disable class-methods-use-this */
import User from '../database/models/UserModel';
import IUserService from '../interfaces/IUserService';

class UserService implements IUserService<string> {
  // eslint-disable-next-line class-methods-use-this
  async list(): Promise<User> {
    const [users] = await User.findAll();
    return users;
  }

  public async login(): Promise<string> {
    const users = await this.list();
    console.log(users);
    console.log('Aqui é a UserService');

    return 'this is a token';
  }

  public teste() {
    return 'essa porra é um teste';
  }
}

export default UserService;
