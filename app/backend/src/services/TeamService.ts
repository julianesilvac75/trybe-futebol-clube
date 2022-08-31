import { StatusCodes } from 'http-status-codes';
import CustomError from '../helpers/CustomError';
import Team from '../database/models/TeamModel';
import ErrorMessages from '../helpers/ErrorMessages';
import ITeam from '../interfaces/ITeam';

class TeamService {
  static async findById(id: number): Promise<ITeam> {
    try {
      const team = await Team.findByPk(id);

      return team as ITeam;
    } catch (e) {
      console.log(e);
      throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.somethingWentWrong);
    }
  }

  static async findAll(): Promise<ITeam[]> {
    try {
      const teams = await Team.findAll();

      return teams as ITeam[];
    } catch (e) {
      console.log(e);
      throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.somethingWentWrong);
    }
  }

  static async getName(id: number) {
    const team = await this.findById(id);

    return team.teamName;
  }
}

export default TeamService;
