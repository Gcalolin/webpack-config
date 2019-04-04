
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const baseConfig = require('./config')
const { getEntries } = require('./getEntry')
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}   

module.exports = {
    //入口 多页面
    entry: getEntries(baseConfig.jsEntryPath),
    //别名
    resolve: {
        alias: {
            '@': resolve('src')
        }  
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: ['babel-loader']
            },{
            //提取样式文件
            test: /\.(scss|css)$/,
            use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader'
                    },{
                        loader: 'sass-loader',
                    },{
                        loader: 'postcss-loader'
                    }]
                }),
            }, 
            //打包html文件里的图片
            {
                test: /\.html$/,
                include: path.resolve(__dirname, '../src'),
                use: [{
                    loader: 'html-withimg-loader'
                }]
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new ExtractTextPlugin({
			filename: 'css/[name].[hash:8].css',
	        allChunks: true
		})
    ]
}
