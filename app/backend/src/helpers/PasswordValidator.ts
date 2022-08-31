import * as Bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import CustomError from './CustomError';
import ErrorMessages from './ErrorMessages';

class PasswordValidator {
  static generate(login: string): string {
    const salt = Bcrypt.genSaltSync(10);
    const hash = Bcrypt.hashSync(login, salt);
    return hash;
  }

  static validate(login: string, password: string): void {
    const check = Bcrypt.compareSync(login, password);

    if (!check) throw new CustomError(StatusCodes.UNAUTHORIZED, ErrorMessages.incorrectField);
  }
}

export default PasswordValidator;
