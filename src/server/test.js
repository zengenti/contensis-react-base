const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

describe('Server Loads', () => {
  require('./server.js');
  const app = require('./server.js').app;
  before(function () {
    return new Promise(resolve => {
      app.on('app_started', function () {
        return resolve();
      });
      //app.emit('ready');
    });
  });
  after(function () {
    return new Promise(resolve => {
      app.emit('stop');
      return resolve();
    });
  });
  it('responds with HTTP 200', () => {
    return chai
      .request('http://localhost:3001')
      .get('/')
      .then(res => {
        res.should.have.status(200);
      })
      .catch(err => {
        throw err;
      });
  });
});
