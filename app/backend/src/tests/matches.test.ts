import * as sinon from 'sinon';
import * as chai from 'chai';
import * as Jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

import { StatusCodes } from 'http-status-codes';
import { app } from '../app';
import Match from '../database/models/MatchModel';
import {
  matchMock,
  inProgressMatchMock,
  createdMatchMock,
  newMatchMock,
  updatedMatchMock,
  sameTeamsMatchMock,
  jwtPayloadMock,
} from './helpers/matches';
import ErrorMessages from '../helpers/ErrorMessages';
import Team from '../database/models/TeamModel';
import { loginMock } from './helpers/login';
import TokenValidator from '../helpers/TokenValidator';

describe('On the /matches route', () => {
  describe('when searched for all matches', () => {
    beforeEach(() =>{
      sinon.stub(Match, 'findAll').resolves([matchMock as Match])
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/matches');
      
      expect(response.status).to.be.equal(StatusCodes.OK);
    });

    it('should return a list with all matches', async () => {
      const response = await chai.request(app)
        .get('/matches');

      expect(response.body).to.be.deep.equal([matchMock]);
    });
  });

  describe('when searched for a match by id', () => {
    const id = 1;

    beforeEach(()=> {
      sinon.stub(Match, 'findByPk').resolves(createdMatchMock as Match);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status 200', async () => {
      const response = await chai.request(app)
        .get(`/matches/${id}`);

      expect(response.status).to.be.equal(StatusCodes.OK);
    });

    it('should return the match with the right id', async () => {
      const response = await chai.request(app)
        .get(`/matches/${id}`);
      
      expect(response.body.id).to.be.equal(id);
    });
  });

  describe('when searched for in progress matches', () => { 
    beforeEach(() => {
      sinon.stub(Match, 'findAll').resolves([inProgressMatchMock as Match]);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/matches')
        .query({ inProgress: 'true' });
      
      expect(response.status).to.be.equal(StatusCodes.OK);
    });

    it('should return only in progress matches', async () => {
      const response = await chai.request(app)
        .get('/matches')
        .query({ inProgress: 'true' });
      
      expect(response.body).to.be.deep.equal([inProgressMatchMock]);
      expect(response.body[0]).to.have.property('inProgress');
      expect(response.body[0].inProgress).to.be.equal(true);
    });
  });

  describe('when searched for finished matches', () => { 
    beforeEach(() => {
      sinon.stub(Match, 'findAll').resolves([matchMock as Match]);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/matches')
        .query({ inProgress: 'false' });
      
      expect(response.status).to.be.equal(StatusCodes.OK);
    });

    it('should return only finished matches', async () => {
      const response = await chai.request(app)
        .get('/matches')
        .query({ inProgress: 'false' });
      
      expect(response.body).to.be.deep.equal([matchMock]);
      expect(response.body[0]).to.have.property('inProgress');
      expect(response.body[0].inProgress).to.be.equal(false);
    });
  });

  describe('when trying to save a new match with valid data', () => {
    beforeEach(() => {
      sinon.stub(Match, 'create').resolves(createdMatchMock as Match);
      sinon.stub(TokenValidator, 'validate').returns(jwtPayloadMock as Jwt.JwtPayload);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status 201', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send(newMatchMock)
        .set('authorization', 'valid-token');
      
      expect(response.status).to.be.equal(StatusCodes.CREATED);
    });

    it('should return a new in progress match', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send(newMatchMock)
        .set('authorization', 'valid-token');

      expect(response.body).to.be.deep.equal(createdMatchMock);
    });
  });

  describe('when trying to save a new match with invalid data', () => {
    beforeEach(() => {
      sinon.stub(TokenValidator, 'validate').returns(jwtPayloadMock as Jwt.JwtPayload);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status 400', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send({
          homeTeam: 16,
          homeTeamGoals: 1,
        })
        .set('authorization', 'valid-token');
      
      expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
    });

    it('shoud return error message', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send({
          homeTeam: 16,
          homeTeamGoals: 1,
        })
        .set('authorization', 'valid-token');
      
      expect(response.body).to.be.deep.equal({ message: ErrorMessages.invalidData });
    });
  });

  describe('when trying to update status of a match', () => {
    const id = 1;
    beforeEach(() => {
      sinon.stub(Match, 'findByPk').resolves(inProgressMatchMock as Match);
      sinon.stub(Match, 'update').resolves([1, [inProgressMatchMock as Match]]);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status 200', async () => {
      const response = await chai.request(app)
        .patch(`/matches/${id}/finish`);

      expect(response.status).to.be.equal(StatusCodes.OK);
    });

    it('should return the match with the updated status', async () => {
      const response = await chai.request(app)
        .patch(`/matches/${id}/finish`);
      
      expect(response.body).to.be.deep.equal({ message: 'Finished' });
    });
  });

  describe('when trying to create a match with two equal teams', () => {
    beforeEach(() => {
      sinon.stub(TokenValidator, 'validate').returns(jwtPayloadMock as Jwt.JwtPayload);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status 401', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send(sameTeamsMatchMock)
        .set('authorization', 'valid-token');

      expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
    });

    it('should return a error message', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send(sameTeamsMatchMock)
        .set('authorization', 'valid-token');
      
      expect(response.body).to.be.deep.equal({ message: ErrorMessages.twoEqualTeams });
    });
  });

  describe(`when trying to create a match with a team that doesn't exist`, () => {
    beforeEach(() => {
      sinon.stub(TokenValidator, 'validate').returns(jwtPayloadMock as Jwt.JwtPayload);
      sinon.stub(Team, 'findByPk').resolves(undefined);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status 404', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send(newMatchMock)
        .set('authorization', 'valid-token');
      
      expect(response.status).to.be.equal(StatusCodes.NOT_FOUND);
    });

    it('should return a error message',async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send(newMatchMock)
        .set('authorization', 'valid-token');

      expect(response.body).to.be.deep.equal({ message: ErrorMessages.noTeamWithSuchId });
    });
  });

  describe('when trying to update info about a match', () => {
    const id = 1;
    beforeEach(() => {
      sinon.stub(Match, 'findByPk').resolves(inProgressMatchMock as Match);
      sinon.stub(Match, 'update').resolves([1, [inProgressMatchMock as Match]]);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status 200', async () => {
      const response = await chai.request(app)
        .patch(`/matches/${id}`)
        .send(updatedMatchMock);

      expect(response.status).to.be.equal(StatusCodes.OK);
    });

    it('should return success message', async () => {
      const response = await chai.request(app)
        .patch(`/matches/${id}`)
        .send(updatedMatchMock);

      expect(response.body).to.be.deep.equal({ message: 'Finished' });
    });
  });
});