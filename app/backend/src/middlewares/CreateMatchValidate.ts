import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as Joi from 'joi';
import ErrorMessages from '../helpers/ErrorMessages';

const createMatchValidate = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

  const required = Joi.object({
    homeTeam: Joi.number().integer().required(),
    awayTeam: Joi.number().integer().required(),
    homeTeamGoals: Joi.number().integer().required(),
    awayTeamGoals: Joi.number().integer().required(),
  });

  const validation = required.validate({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });

  if (validation.error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: ErrorMessages.invalidData });
  }

  next();
};

export default createMatchValidate;
