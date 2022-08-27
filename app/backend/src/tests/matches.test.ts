import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

import { app } from '../app';
import Match from '../database/models/MatchModel';
import { matchMock } from './helpers/matches';
import { StatusCodes } from 'http-status-codes';

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
})