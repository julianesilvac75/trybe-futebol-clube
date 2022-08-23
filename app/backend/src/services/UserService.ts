import { StatusCodes } from 'http-status-codes';
import ErrorMessages from '../helpers/ErrorMessages';
import User from '../database/models/UserModel';
import PasswordValidator from '../helpers/PasswordValidator';
import TokenValidator from '../helpers/TokenValidator';
import CustomError from '../helpers/CustomError';

class UserService {
  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    const { incorrectField } = ErrorMessages;

    if (!user) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, incorrectField);
    }

    PasswordValidator.validate(password, user.password);

    const token = TokenValidator.generate(email, password);
    return { token };
  }
}

export default UserService;
