import { StatusCodes } from 'http-status-codes';
import ErrorMessages from '../helpers/ErrorMessages';
import CustomError from '../helpers/CustomError';
import IMatch from '../interfaces/IMatch';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import INewMatch from '../interfaces/INewMatch';
import ICreatedMatch from '../interfaces/ICreatedMatch';
import TeamService from './TeamService';

class MatchService {
  static async findAll(status: boolean | null = null): Promise<IMatch[]> {
    try {
      let matches;

      if (status) {
        matches = await this.findByStatus(status);
      } else {
        matches = await Match.findAll({
          include: [
            { model: Team, as: 'teamHome', attributes: ['teamName'] },
            { model: Team, as: 'teamAway', attributes: ['teamName'] },
          ] });
      }

      return matches as IMatch[];
    } catch (e) {
      console.log(e);
      throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.somethingWentWrong);
    }
  }

  static async findById(id: number): Promise<IMatch> {
    try {
      const match = await Match.findByPk(id);

      return match as IMatch;
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

  static async create(payload: INewMatch): Promise<ICreatedMatch | null> {
    try {
      const { homeTeam, awayTeam } = payload;

      const team1 = await TeamService.findById(homeTeam);
      const team2 = await TeamService.findById(awayTeam);

      if (!team1 || !team2) {
        return null;
      }

      const newMatch = await Match.create({
        ...payload,
        inProgress: true,
      });

      return newMatch;
    } catch (e) {
      console.log(e);
      throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.somethingWentWrong);
    }
  }

  static async update(id: number, payload: object) {
    try {
      const updated = await Match.update(
        payload,
        { where: { id } },
      );

      return updated;
    } catch (e) {
      console.log(e);
      throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.somethingWentWrong);
    }
  }

  static async updateStatus(id: number) {
    try {
      // implementar logica pra verificar se o match foi mesmo atualizado
      // tipar funcao

      const updated = await this.update(
        id,
        { inProgress: false },
      );

      return updated;
    } catch (e) {
      console.log(e);
      throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.somethingWentWrong);
    }
  }
}

export default MatchService;
