import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import CreateMatchValidate from '../helpers/CreateMatchValidate';
import ErrorMessages from '../helpers/ErrorMessages';

const createMatchMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

  const validation = CreateMatchValidate.validateAll(
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
  );

  if (!validation[0]) {
    const type = validation[1];

    if (type === 'joi') {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: ErrorMessages.invalidData });
    }
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: ErrorMessages.twoEqualTeams });
  }

  next();
};

export default createMatchMiddleware;
