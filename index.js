var axios = require('axios');
var join = require('url-join');
var isAbsoluteURL = require('is-absolute-url');

function base(url) {
  var undo = axios.interceptors.request.use(function(config) {
    if ( !isAbsoluteURL(config.url) ) {
      config.url = join(url, config.url);
      console.log(config.url);
    }

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  return undo;
};

module.exports = base;