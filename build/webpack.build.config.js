
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseWebpackConfig = require('./webpack.base.config');
const baseConfig = require('./config')
const { getHtmlTemplate } = require('./getEntry') 

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[contenthash:8].js'
    },
    module: {
        rules: [{
			test: /\.(eot|svg|ttf|woff)$/i,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 100,
					publicPath: baseConfig.prodPublicPath,
					name: 'font/[name].[hash:8].[ext]'
				}
			}]
		}, {
			test: /\.(png|jpe?g|gif|svg)$/i,
			include: path.resolve(__dirname, '../src'),
			use: [{
				loader: 'url-loader',
				options: {
					limit: 100,
					publicPath: baseConfig.prodPublicPath,
					name: 'img/[name].[hash:8].[ext]'
				}
			}]
		}]
    },
    plugins: [
        // new CleanWebpackPlugin('./dist', {
        //     root: path.dirname(__dirname),
        //     verbose: true,
        //     dry: false
        // }),
        new CleanWebpackPlugin({
			verbose: true,
			dry: false
		}),
        ...getHtmlTemplate(baseConfig.htmlEntryPath, true)
    ]
})