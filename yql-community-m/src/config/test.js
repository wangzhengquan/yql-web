'use strict';

import baseConfig from './base';

let config = {
  API_HOST: 'http://localhost:12306/',
};

export default Object.freeze(Object.assign(baseConfig, config));
