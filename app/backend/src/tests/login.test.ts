import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
// import chaiHttp from 'chai-http';

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import User from '../database/models/UserModel';
import TokenValidator from '../helpers/TokenValidator';
import { StatusCodes } from 'http-status-codes';
import PasswordValidator from '../helpers/PasswordValidator';
import { userMock, loginMock, tokenMock } from './helpers/login';

chai.use(chaiHttp);

const { expect } = chai;

describe('On the /login route', () => {
  describe('when sent valid data', () => {
    beforeEach(() => {
      sinon.stub(PasswordValidator, 'validate');
      sinon.stub(User, 'findOne').resolves(userMock as User);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status 200', async () => {

      const response = await chai.request(app)
        .post('/login')
        .send(loginMock);

      expect(response.status).to.equal(StatusCodes.OK);
    });

    it('should return a token', async () => {
      sinon.stub(TokenValidator, 'generate').returns(tokenMock.token);

      const response = await chai.request(app)
        .post('/login')
        .send(loginMock);
      

      expect(response.body).to.be.deep.equal(tokenMock);
    });
  });
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

});
