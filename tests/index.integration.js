var expect = require('chai').expect;
var sinon = require('sinon');
var nock = require('nock');
var base = require('../');
var axios = require('axios');

describe('autoinjection (integration)', function() {
  afterEach(function() {
    nock.cleanAll();
  });

  it('should inject interceptor', function() {
    sinon.spy(axios.interceptors.request, 'use');

    var eject = base();
    expect(axios.interceptors.request.use.calledOnce).to.be.true;
    axios.interceptors.request.use.restore();
    // eject();
    // No need for cleanup since we spied on `use`
  });

  it('should eject interceptor', function(done) {
    var eject = base('http://persisssists.con');

    nock('http://persisssists.con')
      .get('/hehe')
      .reply(200, { success: true });

    nock('http://localhost')
      .get('/hehe')
      .reply(200, { success: true });

    axios.get('hehe')
      .then(function(res) {
        expect(res.data.success).to.be.true;
        expect(res.config.url).to.match(/persisssists.con\/hehe/);
        eject();
        return axios.get('/hehe');
      })
      .then(function(res) {
        expect(res.data.success).to.be.true;
        expect(res.config.url).to.match(/^\/hehe/);     
      })
      .then(done, done);
  });
});