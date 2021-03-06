const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');

const defaultConfig = require('./webpack.default')

module.exports = {
    entry: {
        app: path.join(defaultConfig.srcDir, 'index.js')
         

    },

    output: {
        // filename: '[name].js',
        // filename: '[name].[chunkhash].js',
        filename: '[name].[hash].js',
        path: defaultConfig.distDir,
        publicPath: '/'
    },

    

    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        },{
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader'
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader'
            ]
        }, {
            test: /\.(js|jsx)$/,
            use: [
                
                'babel-loader'

            ],
            include: [
                defaultConfig.srcDir
                // '/Users/wangzhengquan/workspace/web/react-ui/src'
            ]

        }]
    },

    resolve: {
        alias: {
            'react-ui' : 'f7-react-ui',
            // 'react-ui': '/Users/wangzhengquan/workspace/web/react-ui/src'
            // styles: `${defaultConfig.srcDir}/styles/`,
            // images: `${defaultConfig.srcDir}/images/`
        }
    },

    plugins: [
        new CleanWebpackPlugin([defaultConfig.distDir]),
        /**
         * https://github.com/jantimon/html-webpack-plugin
         * @type {String}
         */
        new HtmlWebpackPlugin({
            title: '一起嗨',
            template: path.join(defaultConfig.srcDir, 'index.html')
        }),
         

        new webpack.optimize.CommonsChunkPlugin({
           name: 'runtime' // Specify the common bundle's name.
        }),

        /**
         * generate manifest.json
         */
        new ManifestPlugin()
    ]
};