'use strict';

import baseConfig from './base';

let config = {
	API_HOST: 'http://localhost:7070/yqhi',
	USER_HOST: 'http://192.168.1.6:8000'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
