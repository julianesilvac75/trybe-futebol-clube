import { StatusCodes } from 'http-status-codes';
import ErrorMessages from '../helpers/ErrorMessages';
import User from '../database/models/UserModel';
import PasswordValidator from '../helpers/PasswordValidator';
import TokenValidator from '../helpers/TokenValidator';
import CustomError from '../helpers/CustomError';

class UserService {
  static async findByEmail(email: string) {
    const user = await User.findOne({ where: { email } });

    return user;
  }

  static async getRole(email: string) {
    const user = await this.findByEmail(email);

    if (!user) throw new CustomError(StatusCodes.NOT_FOUND, ErrorMessages.userNotFound);

    return user.role;
  }

  static async login(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (!user) throw new CustomError(StatusCodes.UNAUTHORIZED, ErrorMessages.incorrectField);

    PasswordValidator.validate(password, user.password);

    const token = TokenValidator.generate(email, password);
    return { token };
  }
}

export default UserService;
