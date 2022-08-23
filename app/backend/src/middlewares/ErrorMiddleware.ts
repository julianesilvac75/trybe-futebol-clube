import { NextFunction, Request, Response } from 'express';
import CustomError from '../helpers/CustomError';

const errorMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const { status, message } = err;
  res.status(status).json({ message });

  next();
};

export default errorMiddleware;
