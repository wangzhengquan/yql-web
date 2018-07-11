const baseConfig = require('./webpack.base')
const defaultConfig = require('./webpack.default')
const webpack =  require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');

module.exports = merge(baseConfig, {
  devtool: 'source-map',
   
  plugins: [
    new UglifyJSPlugin(),

    new webpack.DefinePlugin({
       'process.env': {
         'NODE_ENV': JSON.stringify('production')
       }
    }),
    
    new webpack.HashedModuleIdsPlugin()
  ]

})