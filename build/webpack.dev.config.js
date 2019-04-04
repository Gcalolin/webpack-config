
const path = require('path');
const merge = require('webpack-merge');
const Glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const baseWebpackConfig = require('./webpack.base.config');
var baseConfig = require('./config')
var { getHtmlTemplate } = require('./getEntry') 

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js'
    },
    //显示源码报错信息
    devtool: 'inline-source-map',
    module: {
        rules: [{
			test: /\.(eot|svg|ttf|woff)$/i,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 100,
					publicPath: baseConfig.devPublicPath,
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
					publicPath: baseConfig.devPublicPath,
					name: 'img/[name].[hash:8].[ext]'      //name属性改变图片打包目录和文件名
				}
			}]
		}]
    },
    plugins: [
		//模块热加载 自动刷新浏览器
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
        ...getHtmlTemplate(baseConfig.htmlEntryPath)
    ]
})