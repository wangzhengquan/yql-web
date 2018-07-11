'use strict';

import baseConfig from './base';

let config = {
	API_HOST: 'http://192.168.0.100:7070/yql'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
