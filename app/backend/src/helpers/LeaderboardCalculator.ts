import IBoardStructure from '../interfaces/IBoardStructure';
import IMatch from '../interfaces/IMatch';

class LeaderboardCalculator {
  static getPoints(match: IMatch) {
    const { homeTeamGoals, awayTeamGoals } = match;
    if (homeTeamGoals > awayTeamGoals) return 3;
    if (homeTeamGoals === awayTeamGoals) return 1;
    return 0;
  }

  static getVictories(match: IMatch) {
    return match.homeTeamGoals > match.awayTeamGoals ? 1 : 0;
  }

  static getDraws(match: IMatch) {
    return match.homeTeamGoals === match.awayTeamGoals ? 1 : 0;
  }

  static getLosses(match: IMatch) {
    return match.homeTeamGoals < match.awayTeamGoals ? 1 : 0;
  }

  static getAllInfo(prev: IBoardStructure, curr: IMatch, _index: number, arr: IMatch[]) {
    const totalPoints = prev.totalPoints + LeaderboardCalculator.getPoints(curr);

    const goalsFavor = prev.goalsFavor + curr.homeTeamGoals;
    const goalsOwn = prev.goalsOwn + curr.awayTeamGoals;
    const efficiency = (totalPoints / (prev.totalGames * 3)) * 100;

    return {
      name: curr.teamHome.teamName,
      totalPoints,
      totalGames: arr.length,
      totalVictories: prev.totalVictories + LeaderboardCalculator.getVictories(curr),
      totalDraws: prev.totalDraws + LeaderboardCalculator.getDraws(curr),
      totalLosses: prev.totalLosses + LeaderboardCalculator.getLosses(curr),
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: parseFloat(efficiency.toFixed(2)),
    };
  }
}

export default LeaderboardCalculator;
