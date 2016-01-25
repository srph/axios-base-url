var expect = require('chai').expect;
var nock = require('nock');
var base = require('../base');
var axios = require('axios');
var fixture = require('./interceptor.fixture');

describe('axios-base-url interceptor (integration)', function() {
  afterEach(function() {
    nock.cleanAll();
  });

  it('should not append the base-url if request url is absolute', function(done) {
    var interceptor = fixture.inject(base('//yolo.com'));

    nock('http://swag.com')
      .get('/hehe')
      .reply(200, { success: true });

    axios.get('http://swag.com/hehe')
      .then(function(res) {
        expect(res.data.success).to.be.true;
        expect(res.config.url).to.match(/swag.com\/hehe/);
        fixture.eject(interceptor);
      })
      .then(done, done);
  });

  it('should append the base-url otherwise', function(done) {
    var interceptor = fixture.inject(base('http://yoloswag.com'));

    nock('http://yoloswag.com')
      .get('/hehe')
      .reply(200, { success: true });

    axios.get('hehe')
      .then(function(res) {
        expect(res.data.success).to.be.true;
        expect(res.config.url).to.match(/yoloswag.com\/hehe/);
        fixture.eject(interceptor);
      })
      .then(done, done);
  });
});