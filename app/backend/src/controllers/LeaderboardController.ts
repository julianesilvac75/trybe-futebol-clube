import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderboardService from '../services/LeaderboardService';
import ErrorMessages from '../helpers/ErrorMessages';

class LeaderboardController {
  static async home(req: Request, res: Response) {
    try {
      const matches = await LeaderboardService.getBoard();

      return res.status(StatusCodes.OK).json(matches);
    } catch (e) {
      console.log(e);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: ErrorMessages.somethingWentWrong });
    }
  }
}

export default LeaderboardController;
