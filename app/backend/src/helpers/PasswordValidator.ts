import * as Bcrypt from 'bcryptjs';

class PasswordValidator {
  static generate(login: string): string {
    const salt = Bcrypt.genSaltSync(10);
    const hash = Bcrypt.hashSync(login, salt);
    return hash;
  }

  static validate(login: string, password: string): boolean {
    const check = Bcrypt.compareSync(login, password);

    return check;
  }
}

export default PasswordValidator;
