/* eslint-disable class-methods-use-this */
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as Joi from 'joi';

const errorMessage = (_error: Joi.ValidationErrorItem): {
  code: number,
  name: string,
  message: string } => {
  if (_error?.type.includes('required')) {
    return {
      code: StatusCodes.BAD_REQUEST,
      name: 'Bad Request',
      message: _error.message,
    };
  }

  return {
    code: StatusCodes.UNPROCESSABLE_ENTITY,
    name: 'Unprocessable Entity',
    message: _error?.message ?? '',
  };
};

const loginValidate = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const required = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
  });

  const validation = required.validate({ email, password });
  // console.log(validation.error?.details[0]);

  if (validation.error) {
    const error = errorMessage(validation.error?.details[0]);
    console.log(error);

    return res.status(error.code).json(error.message);
  }

  next();
};

export default loginValidate;

// class LoginValidate {
//   private error(error: Joi.ValidationErrorItem | undefined): { code: number,
//     name: string, message: string } {
//     if (error?.type.includes('required')) {
//       return {
//         code: StatusCodes.BAD_REQUEST,
//         name: 'Bad Request',
//         message: error.message,
//       };
//     }

//     return {
//       code: StatusCodes.UNPROCESSABLE_ENTITY,
//       name: 'Unprocessable Entity',
//       message: error?.message ?? '',
//     };
//   }

//   static validate(req: Request, _res: Response, _next: NextFunction) {
//     const { email, password } = req.body;

//     const required = Joi.object({
//       email: Joi.string().email().required(),
//       password: Joi.string().min(7).required(),
//     });

//     const validation = required.validate({ email, password });
//     console.log(validation.error?.details[0]);

//     console.log(this.error(validation.error?.details[0]));

//     // if (validation.error) {
//     //   const error = this.error(validation.error.details[0]);
//     //   console.log(error);

//     //   // return res.status(error.code).json({ message: error.message });
//     // }

//     // next();
//   }
// }

// export default LoginValidate;
