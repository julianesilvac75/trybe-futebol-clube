import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as Joi from 'joi';
import ErrorMessages from '../helpers/ErrorMessages';

const loginValidate = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const required = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
  });

  const validation = required.validate({ email, password });

  if (validation.error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: ErrorMessages.required });
  }

  next();
};

export default loginValidate;
