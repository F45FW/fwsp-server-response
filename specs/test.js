'use strict';

require('./helpers/chai.js');

const ServerResponse = require('../index.js');
const serverResponse = new ServerResponse();
serverResponse.setTestMode();

describe('Server Response', () => {
  it('should have exported HTTP response types', () => {
    expect(ServerResponse.HTTP_OK).to.equal(200);
    expect(ServerResponse.HTTP_BAD_REQUEST).to.equal(400);
    expect(ServerResponse.HTTP_UNAUTHORIZED).to.equal(401);
    expect(ServerResponse.HTTP_REQUEST_FAILED).to.equal(402);
    expect(ServerResponse.HTTP_NOT_FOUND).to.equal(404);
    expect(ServerResponse.HTTP_CONFLICT).to.equal(409);
    expect(ServerResponse.HTTP_TOO_LARGE).to.equal(413);
    expect(ServerResponse.HTTP_TOO_MANY_REQUEST).to.equal(429);
    expect(ServerResponse.HTTP_SERVER_ERROR).to.equal(500);
    expect(ServerResponse.HTTP_METHOD_NOT_IMPLEMENTED).to.equal(501);
    expect(ServerResponse.HTTP_CONNECTION_REFUSED).to.equal(502);
    expect(ServerResponse.HTTP_SERVICE_UNAVAILABLE).to.equal(503);
  });

  it('should support getting HTTP status', () => {
    let status = ServerResponse.STATUS[ServerResponse.HTTP_OK];
    expect(status[ServerResponse.STATUSMESSAGE]).to.equal('OK');
    expect(status[ServerResponse.STATUSDESCRIPTION]).to.equal('Request succeeded without error');
  });

  it('should allow createResponseObject to return a proper response for use with HTTP', () => {
    let response = serverResponse.createResponseObject(ServerResponse.HTTP_OK, {
      result: {
        values: [1,2,3,4,5]
      }
    });
    expect(response.result).to.not.be.null;
    expect(response.result).to.have.property('values');
    expect(response.result.values).to.include(1);
    expect(response.result.values).to.include(2);
    expect(response.result.values).to.include(3);
    expect(response.result.values).to.include(4);
    expect(response.result.values).to.include(5);
  });

  it('should have sendOk properly format output', () => {
    let res = {};
    res = serverResponse.sendOk(res, {
      result: [1,2,3,4,5]
    });
    console.log(res);
    expect(res.headers['Content-Type']).to.equal('application/json');
    expect(res.headers['Content-Length']).to.equal(114);
    expect(res.response.statusCode).to.equal(200);
    expect(res.response.statusMessage).to.equal('OK');
    expect(res.response.result).to.be.an('array');
    expect(res.response.result).to.deep.equal([1,2,3,4,5]);
  });

  it('should be able to add return HTTP headers', () => {
    let res = {};
    let data = {
      headers: {
        'X-Powered-By': 'hydra/2.0'
      }
    };
    res = serverResponse.sendOk(res, data);
    expect(res.headers['X-Powered-By']).to.equal('hydra/2.0');
  });

  it('should be able to change return HTTP headers', () => {
    let res = {};
    let data = {
      headers: {
        'Content-Type': 'text/plain'
      }
    };
    res = serverResponse.sendOk(res, data);
    expect(res.headers['Content-Type']).to.equal('text/plain');
  });

});
