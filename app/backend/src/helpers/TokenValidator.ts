import * as Jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

class TokenValidator {
  static generate(email: string, password: string) {
    const jwtSecret = process.env.JWT_SECRET || 'secret_password';
    const jwtConfig = { expiresIn: '7d' };

    const token = Jwt.sign(
      { data: { email, password } },
      jwtSecret,
      jwtConfig,
    );

    return token;
  }
}

export default TokenValidator;
