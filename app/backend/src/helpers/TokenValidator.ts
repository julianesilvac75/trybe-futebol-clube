import * as Jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

const jwtSecret = process.env.JWT_SECRET || 'secret_password';
const jwtConfig = { expiresIn: '7d' };

dotenv.config();

class TokenValidator {
  static generate(email: string, password: string) {
    const token = Jwt.sign(
      { data: { email, password } },
      jwtSecret,
      jwtConfig,
    );

    return token;
  }

  static validate(token: string) {
    const check = Jwt.verify(token, jwtSecret);

    return check;
  }
}

export default TokenValidator;
