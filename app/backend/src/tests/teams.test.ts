import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

import { app } from '../app';
import Team from '../database/models/TeamModel';
import ITeam from '../interfaces/ITeam';
import User from '../database/models/UserModel';
import { StatusCodes } from 'http-status-codes';
import { teamMock } from './helpers/teams';

describe('On the /teams route', () => {
  describe('when getting all teams', () => {
    beforeEach(() => {
      sinon.stub(Team, 'findAll').resolves([teamMock as Team]);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/teams');

      expect(response.status).to.be.equal(StatusCodes.OK);
    });

    it('should return a list with all teams', async () => {
      const response = await chai.request(app)
        .get('/teams');
      
      expect(response.body).to.be.deep.equal([teamMock])
    });
  });

  describe('when passing an id in the route', () => {
    const { id } = teamMock;

    beforeEach(() => {
      sinon.stub(Team, 'findOne').resolves(teamMock as Team);
    });
    
    afterEach(() => {
      sinon.restore();
    });

    it('should return status 200', async () => {
      const response = await chai.request(app)
        .get(`/teams/${id}`);
      
      expect(response.status).to.be.equal(StatusCodes.OK);
    });

    it('should return a team with the matching id', async () => {
      const response = await chai.request(app)
        .get(`/teams/${id}`);

      expect(response.body).to.have.property('id');
      expect(response.body.id).to.be.equal(id);
      expect(response.body).to.be.deep.equal(teamMock);
    });
  });
});
