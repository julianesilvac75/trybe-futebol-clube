import ITeam from '../interfaces/ITeam';
import IMatch from '../interfaces/IMatch';
import MatchService from './MatchService';
import TeamService from './TeamService';
import IBoardStructure from '../interfaces/IBoardStructure';
import LeaderboardCalculator from '../helpers/LeaderboardCalculator';

class LeaderboardService {
  static structure: IBoardStructure = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  };

  static async getFinishedMatches(teams: ITeam[]) {
    const matches = await MatchService.findByStatus(false);

    return teams
      .map((team: ITeam) => matches.filter((match: IMatch) => team.id === match.homeTeam));
  }

  static calculatePoints(finishedMatches: IMatch[]) {
    const matches = finishedMatches.reduce(LeaderboardCalculator.getAllInfo, this.structure);

    return matches;
  }

  static sortInfo(a: IBoardStructure, b: IBoardStructure) {
    const sortByPoints = b.totalPoints - a.totalPoints;
    const sortByVictories = b.totalVictories - a.totalVictories;
    const sortByBalance = b.goalsBalance - a.goalsBalance;
    const sortByGoalsFavor = b.goalsFavor - a.goalsFavor;

    return sortByPoints || sortByVictories || sortByBalance || sortByGoalsFavor;
  }

  static async getBoard() {
    const teams = await TeamService.findAll();
    const finished = await this.getFinishedMatches(teams);
    const teamsInfo = finished.map((arr) => this.calculatePoints(arr));
    const sortedInfo = teamsInfo
      .sort(this.sortInfo);

    return sortedInfo;
  }
}

export default LeaderboardService;
