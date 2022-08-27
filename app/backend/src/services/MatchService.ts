import { StatusCodes } from 'http-status-codes';
import ErrorMessages from '../helpers/ErrorMessages';
import CustomError from '../helpers/CustomError';
import IMatch from '../interfaces/IMatch';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

class MatchService {
  static async findAll(): Promise<IMatch[]> {
    try {
      const matches = await Match.findAll({
        include: [
          { model: Team, as: 'teamHome', attributes: ['teamName'] },
          { model: Team, as: 'teamAway', attributes: ['teamName'] },
        ] });

      return matches as IMatch[];
    } catch (e) {
      console.log(e);
      throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.somethingWentWrong);
    }
  }

  static async findByStatus(status: boolean): Promise<IMatch[]> {
    try {
      const matches = await Match.findAll({
        where: { inProgress: status },
        include: [
          { model: Team, as: 'teamHome', attributes: ['teamName'] },
          { model: Team, as: 'teamAway', attributes: ['teamName'] },
        ] });

      return matches as IMatch[];
    } catch (e) {
      console.log(e);
      throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.somethingWentWrong);
    }
  }
}

export default MatchService;
