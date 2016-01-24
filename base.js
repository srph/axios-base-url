var axios = require('axios');
var join = require('url-join');
var isAbsoluteURL = require('is-absolute-url');

function base(url) {
  return function(config) {
    if ( !isAbsoluteURL(config.url) ) {
      config.url = join(url, config.url);
    }

    return config;
  };
};

module.exports = base;