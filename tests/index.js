var expect = require('chai').expect;
var sinon = require('sinon');
var nock = require('nock');
var rewire = require('rewire');
var inject = rewire('../');
var axios = require('axios');

describe('autoinjection', function() {
  var sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    nock.cleanAll();
    sandbox.restore();
  });

  it('should inject interceptor', function() {
    var spy = sandbox.spy();
    var stub = sandbox.stub().returns(spy);
    var revert = inject.__set__('base', stub);
    sandbox.spy(axios.interceptors.request, 'use');

    var eject = inject();
    expect(axios.interceptors.request.use.calledOnce).to.be.true;
    expect(axios.interceptors.request.use.calledWith(spy)).to.be.true;
    eject();
    revert();
  });

  it('should return an ejectable interceptor', function(done) {
    var spy = function(c) { return c; };
    var stub = sandbox.stub().returns(spy);
    var revert = inject.__set__('base', stub);
    sandbox.spy(axios.interceptors.request, 'eject');

    var eject = inject();
    expect(eject, 'should return a callback').to.be.a('function');

    nock('http://localhost')
      .get('/hehe')
      .reply(200, { success: true });

    axios.get('/hehe')
      .then(function(res) {
        eject();
        expect(axios.interceptors.request.eject.calledOnce).to.be.true;
      })
      .then(revert)
      .then(done, done);
  });
});