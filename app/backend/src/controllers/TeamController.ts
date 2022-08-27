import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorMessages from '../helpers/ErrorMessages';
import CustomError from '../helpers/CustomError';
import TeamService from '../services/TeamService';

class TeamController {
  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const team = await TeamService.findById(parseInt(id, 10));

      if (!team) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: ErrorMessages.noTeamsFound });
      }

      return res.status(StatusCodes.OK).json(team);
    } catch (e) {
      console.log(e);
      throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.somethingWentWrong);
    }
  }
}

export default TeamController;
