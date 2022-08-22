import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as Joi from 'joi';
import ErrorMessages from '../helpers/ErrorMessages';

const errorMessage = (error: Joi.ValidationErrorItem): {
  code: number,
  name: string,
  message: string } => {
  if (error?.type.includes('required')) {
    return {
      code: StatusCodes.BAD_REQUEST,
      name: 'Bad Request',
      message: ErrorMessages.required,
    };
  }

  return {
    code: StatusCodes.UNPROCESSABLE_ENTITY,
    name: 'Unprocessable Entity',
    message: ErrorMessages.incorrectField,
  };
};

const loginValidate = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const required = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
  });

  const validation = required.validate({ email, password });

  if (validation.error) {
    const { code, message } = errorMessage(validation.error?.details[0]);

    return res.status(code).json({ message });
  }

  next();
};

export default loginValidate;
