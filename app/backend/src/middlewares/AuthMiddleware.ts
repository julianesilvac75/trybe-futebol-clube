import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import TokenValidator from '../helpers/TokenValidator';
import ErrorMessages from '../helpers/ErrorMessages';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: ErrorMessages.invalidToken });
    }

    const user = TokenValidator.validate(authorization) as JwtPayload;
    console.log(user);

    req.body = {
      ...req.body,
      ...user,
    };

    next();
  } catch (e) {
    console.error(e);
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: ErrorMessages.invalidToken });
  }
};

export default authMiddleware;
