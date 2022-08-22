import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as Joi from 'joi';

class LoginValidate {
  static error(error: Joi.ValidationErrorItem): { code: number, name: string, message: string } {
    if (error.type.includes('required')) {
      return {
        code: StatusCodes.BAD_REQUEST,
        name: 'Bad Request',
        message: error.message,
      };
    }

    return {
      code: StatusCodes.UNPROCESSABLE_ENTITY,
      name: 'Unprocessable Entity',
      message: error.message,
    };
  }

  static validate(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const required = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(7).required(),
    });

    const validation = required.validate({ email, password });

    if (validation.error) {
      const error = this.error(validation.error.details[0]);

      return res.status(error.code).json({ message: error.message });
    }

    next();
  }
}

export default LoginValidate;
