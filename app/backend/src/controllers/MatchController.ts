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

  // static async findByStatus(req: Request, res: Response) {
  //   try {
  //     const matches = await MatchService.findByStatus(inProgress === 'true');

  //     if (!matches) {
  //       return res.status(StatusCodes.NOT_FOUND)
  //         .json({ message: ErrorMessages.noMatchesFound });
  //     }

  //     return res.status(StatusCodes.OK).json(matches);
  //   } catch (e) {
  //     console.log(e);
  //     throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.somethingWentWrong);
  //   }
  // }
}

export default MatchController;
