var axios = require('axios');

var inject = exports.inject = function(interceptor) {
  return axios.interceptors.request.use(interceptor);
}

var eject = exports.eject = function(interceptor) {
  axios.interceptors.request.eject(interceptor);
}