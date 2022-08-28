import INewMatch from './INewMatch';

interface ICreatedMatch extends INewMatch{
  id: number,
  inProgress: boolean,
}

export default ICreatedMatch;
