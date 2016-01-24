## axios-base-url
An `axios` inteceptor allowing you to set a base url for all requests.

## Installation
```bash
npm i axios-base-url -S
```

## Usage
```js
var axios = require('axios');
var base = require('axios-base-url')('http://graph.facebook.com');
axios.interceptors.request.use(base);
```

or, you can take advantage of auto injection:

```diff
- var axios = require('axios');
- var base = require('axios-base-url')('http://graph.facebook.com');
+ require('axios-base-url/inject')('http://graph.facebook.com');
- axios.interceptors.request.use(base);
```

## why not auto-inject by default?
axios supports [custom instances](https://github.com/mzabriskie/axios#interceptors).