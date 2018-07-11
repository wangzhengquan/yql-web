'use strict';

import baseConfig from './base';

let config = {
  API_HOST: 'http://60.205.148.118:8080',
  COMMUNITY_HOST: 'http://i.haojuyou.com'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
