import ICreatedMatch from './ICreatedMatch';

interface IMatch extends ICreatedMatch {
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}

export default IMatch;
