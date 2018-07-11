'use strict';

import baseConfig from './base';

let config = {
  API_HOST: 'http://192.168.1.100:7070/yql',
  //API_HOST: 'http://60.205.148.118:8080',
  COMMUNITY_HOST: 'http://localhost:8009'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
