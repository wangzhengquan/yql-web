'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');
// let HtmlWebpackPlugin = require('html-webpack-plugin')

let config = Object.assign({}, baseConfig, {
  entry: [
    'webpack-dev-server/client?http://'+defaultSettings.host+':' + defaultSettings.port,
    'webpack/hot/only-dev-server',
    path.join(defaultSettings.srcPath,'index')
  ],
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: path.join(defaultSettings.distPath,'index.html'),
    //   template: path.join(defaultSettings.srcPath, 'template.html'),
    //   inject: true
    // }),
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths,
    [ defaultSettings.srcPath, 
      '/Users/wangzhengquan/workspace/web/react-ui/src'
    ]
  )
});

module.exports = config;
