import { JwtPayload } from 'jsonwebtoken';
import ICreatedMatch from '../../interfaces/ICreatedMatch';
import IMatch from '../../interfaces/IMatch';
import INewMatch from '../../interfaces/INewMatch';
import { loginMock } from './login';

export const matchMock: IMatch = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: false,
  teamHome: {
    teamName: 'São Paulo',
  },
  teamAway: {
    teamName: 'Grêmio'
  }
};


export const inProgressMatchMock: IMatch = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: true,
  teamHome: {
    teamName: 'São Paulo'
  },
  teamAway: {
    teamName: 'Grêmio'
  }
};

export const newMatchMock: INewMatch = {
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
}

export const createdMatchMock: ICreatedMatch = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: true,
};

export const updatedMatchMock: ICreatedMatch= {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: false,
}

export const sameTeamsMatchMock: INewMatch = {
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 16,
  awayTeamGoals: 1,
}

export const jwtPayloadMock: JwtPayload = {
  data: loginMock,
  iat: 1661958778,
  exp: 1662563578,
}

export const updateMatchMock = {
  homeTeamGoals: 3,
  awayTeamGoals: 1
}
