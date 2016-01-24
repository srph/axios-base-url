var expect = require('chai').expect;
var nock = require('nock');
var base = require('../');
var axios = require('axios');

describe('autoinjection', function() {
  afterEach(function() {
    nock.cleanAll();
  });

  it('should append the base-url otherwise', function(done) {
    var eject = base('http://persisssists.con');

    nock('http://persisssists.con')
      .get('/hehe')
      .reply(200, { success: true });

    axios.get('hehe')
      .then(function(res) {
        expect(res.data.success).to.be.true;
        expect(res.config.url).to.match(/persisssists.con\/hehe/);
        eject();
      })
      .then(done, done);
  });
});