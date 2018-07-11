'use strict';
let path = require('path');
let defaultSettings = require('./defaults');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];
console.log('========__dirname', __dirname)
module.exports = {
  additionalPaths: additionalPaths,
  host: defaultSettings.host,
  port: defaultSettings.port,
  debug: true,
  devtool: 'eval',
  output: {
    path: path.join(defaultSettings.distPath, 'assets'),
    filename: 'app.js',
    chunkFilename: '[id].chunk.js',
    publicPath: `.${defaultSettings.publicPath}`
  },
  devServer: {
    contentBase: defaultSettings.srcPath,
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
     'react-ui': `/Users/wangzhengquan/workspace/web/react-ui/src`,
       // 'react-ui': 'f7-react-ui',
      'react': path.join(__dirname, '../node_modules', 'react')
    // 'react-ui': `${defaultSettings.srcPath}/../react-ui/src`
    // actions: `${defaultSettings.srcPath}/actions/`,
    // components: `${defaultSettings.srcPath}/components/`,
    // sources: `${defaultSettings.srcPath}/sources/`,
    //  stores: `${defaultSettings.srcPath}/stores/`,
    //  styles: `${defaultSettings.srcPath}/styles/`,
    //  config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV
    }
  },
  module: {}
};
