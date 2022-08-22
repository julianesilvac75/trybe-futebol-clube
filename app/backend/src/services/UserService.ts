import ErrorMessages from '../helpers/ErrorMessages';
import User from '../database/models/UserModel';
import PasswordValidator from '../helpers/PasswordValidator';
import TokenValidator from '../helpers/TokenValidator';

class UserService {
  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    const { incorrectField } = ErrorMessages;

    if (!user) {
      return { message: incorrectField };
    }

    if (!PasswordValidator.validate(password, user.password)) {
      return { message: incorrectField };
    }

    const token = TokenValidator.generate(email, password);
    return { token };
  }
}

export default UserService;
