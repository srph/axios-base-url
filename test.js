var expect = require('chai').expect;
var nock = require('nock');
var base = require('./');
var axios = require('axios');

describe('axios-base-url interceptor', function() {
  afterEach(function() {
    nock.cleanAll();
  });

  it('should not append the base-url if request url is absolute', function(done) {
    var undo = base('//yolo.com');

    nock('http://swag.com')
      .get('/hehe')
      .reply(200, { success: true });

    axios.get('http://swag.com/hehe')
      .then(function(res) {
        expect(res.data.success).to.be.true;
        expect(res.config.url).to.match(/swag.com\/hehe/);
        undo();
      })
      .then(done, done);
  });

  it('should append the base-url otherwise', function(done) {
    var undo = base('http://persisssists.con');

    nock('http://persisssists.con')
      .get('/hehe')
      .reply(200, { success: true });

    axios.get('http://persisssists.con/hehe')
      .then(function(res) {
        expect(res.data.success).to.be.true;
        expect(res.config.url).to.match(/persisssists.con\/hehe/);
        undo();
      })
      .then(done, done);
  });
});