import * as sinon from 'sinon';
import * as chai from 'chai';
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
  newMatchMock
} from './helpers/matches';
import ErrorMessages from '../helpers/ErrorMessages';

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
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status 201', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send(newMatchMock);
      
      expect(response.status).to.be.equal(StatusCodes.CREATED);
    });

    it('should return a new in progress match', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send(newMatchMock);

      expect(response.body).to.be.deep.equal(createdMatchMock);
    });
  });

  describe('when trying to save a new match with invalid data', () => {
    it('should return status 400', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send({
          homeTeam: 16,
          homeTeamGoals: 1,
        });
      
      expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
    });

    it('shoud return error message', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send({
          homeTeam: 16,
          homeTeamGoals: 1,
        });
      
      expect(response.body).to.be.deep.equal({ message: ErrorMessages.invalidData });
    })
  });
});