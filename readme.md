## axios-base-url [![npm version](http://img.shields.io/npm/v/axios-base-url.svg?style=flat-square)](https://npmjs.org/package/axios-base-url?style=flat-square) [![Build Status](https://img.shields.io/travis/srph/axios-base-url.svg?style=flat-square)](https://travis-ci.org/srph/axios-base-url?branch=master)
An [**axios**](https://github.com/mzabriskie/axios) interceptor allowing you to set a base url for all requests.

## Installation
```bash
npm i axios-base-url -S
```

## Usage
```js
require('axios-base-url')('http://graph.facebook.com');
```
That's all you need to do to keep going!

## Ejecting
`axios-base-url` returns a callback that automatically [ejects](https://github.com/mzabriskie/axios#interceptors) the interceptor.
```js
var eject = require('axios-base-url')('http://graph.facebook.com');
eject();
```

## Custom Instances
In case of [custom instances](https://github.com/mzabriskie/axios#interceptors), you can directly use the function used by the library:

```js
var axios = require('axios');
var base = require('axios-base-url/base')('http://graph.facebook.com');
axios.interceptors.request.use(base);
```

**Note**: You are *requiring* `axios-base-url/base` not `axios-base-url`.
