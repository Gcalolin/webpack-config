
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseWebpackConfig = require('./webpack.base.config');
const baseConfig = require('./config')
const { getHtmlTemplate } = require('./getEntry') 

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../distTest'),
        filename: 'js/[name].[contenthash:8].js'
    },
    module: {
        rules: [{
			test: /\.(eot|svg|ttf|woff)$/i,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 100,
					publicPath: baseConfig.testPublicPath,
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
					publicPath: baseConfig.testPublicPath,
					name: 'img/[name].[hash:8].[ext]'
				}
			}]
		}]
    },
    plugins: [
		//version 1.x
        // new CleanWebpackPlugin('./distTest',{
		// 	root: path.dirname(__dirname),
        //     verbose: true,
        //     dry: false //启用删除文件
		// }),
		//version 2.x
		new CleanWebpackPlugin({
			verbose: true,
			dry: false
		}),
        ...getHtmlTemplate(baseConfig.htmlEntryPath, true)
    ]
})