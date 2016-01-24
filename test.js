var expect = require('chai').expect;
var nock = require('nock');
var base = require('./');
var axios = require('axios');

var inject = function(interceptor) {
  return axios.interceptors.request.use(interceptor);
}

var eject = function(interceptor) {
  axios.interceptors.request.eject(interceptor);
}

describe('axios-base-url interceptor', function() {
  afterEach(function() {
    nock.cleanAll();
  });

  it('should not append the base-url if request url is absolute', function(done) {
    var interceptor = inject(base('//yolo.com'));

    nock('http://swag.com')
      .get('/hehe')
      .reply(200, { success: true });

    axios.get('http://swag.com/hehe')
      .then(function(res) {
        expect(res.data.success).to.be.true;
        expect(res.config.url).to.match(/swag.com\/hehe/);
        eject(interceptor);
      })
      .then(done, done);
  });

  it('should append the base-url otherwise', function(done) {
    var interceptor = inject(base('http://persisssists.con'));

    nock('http://persisssists.con')
      .get('/hehe')
      .reply(200, { success: true });

    axios.get('hehe')
      .then(function(res) {
        expect(res.data.success).to.be.true;
        expect(res.config.url).to.match(/persisssists.con\/hehe/);
        eject(interceptor);
      })
      .then(done, done);
  });
});