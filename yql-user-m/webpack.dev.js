const baseConfig = require('./webpack.base.js')
const defaultConfig = require('./webpack.default.js')
const {NamedModulesPlugin, HotModuleReplacementPlugin} = require('webpack');
const merge = require('webpack-merge');

module.exports = merge(baseConfig, {
	devtool: 'inline-source-map',
  devServer: {
      contentBase: defaultConfig.distDir,
      hot: true,
      historyApiFallback: true,
      // compress: true,
      host: '0.0.0.0',
      port: 8082
  },
  plugins: [
  	new NamedModulesPlugin(),
    new HotModuleReplacementPlugin()
  ]

})
