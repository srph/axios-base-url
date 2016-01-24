var axios = require('axios');
var base = require('./base');

function inject(url) {
  var interceptor = axios.interceptors.request.use(base(url));

  return function() {
    axios.interceptors.request.eject(interceptor);
  };
};

module.exports = inject;