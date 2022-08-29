import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorMessages from '../helpers/ErrorMessages';
import CustomError from '../helpers/CustomError';
import MatchService from '../services/MatchService';

class MatchController {
  static async findAll(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;
      let matches;

      if (inProgress) {
        matches = await MatchService.findByStatus(inProgress === 'true');
      } else {
        matches = await MatchService.findAll();
      }

      if (!matches) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: ErrorMessages.noMatchesFound });
      }

      return res.status(StatusCodes.OK).json(matches);
    } catch (e) {
      console.log(e);
      throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.somethingWentWrong);
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const match = await MatchService.findById(parseInt(id, 10));

      if (!match) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: ErrorMessages.noMatchesFound });
      }

      return res.status(StatusCodes.OK).json(match);
    } catch (e) {
      console.log(e);
      throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.somethingWentWrong);
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

      const newMatch = await MatchService.create({
        homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });

      if (!newMatch) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: ErrorMessages.noTeamWithSuchId });
      }

      return res.status(StatusCodes.CREATED).json(newMatch);
    } catch (e) {
      console.log(e);
      throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.somethingWentWrong);
    }
  }

  static async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const updated = await MatchService.updateStatus(parseInt(id, 10));

      console.log(updated);

      return res.status(StatusCodes.OK).json({ message: 'Finished' });
    } catch (e) {
      console.log(e);
      throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.somethingWentWrong);
    }
  }
}

export default MatchController;
