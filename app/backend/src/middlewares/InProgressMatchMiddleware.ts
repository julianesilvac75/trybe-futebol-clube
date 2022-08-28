import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorMessages from '../helpers/ErrorMessages';

const InProgressMatchMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { inProgress } = req.query;

  if (inProgress !== 'true' && inProgress !== 'false') {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: ErrorMessages.invalidParameters });
  }

  next();
};

export default InProgressMatchMiddleware;
