

const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const ROOT = process.cwd();

const devWebpackConfig = require('./webpack.dev.config');

const options =  {
    contentBase: [
        path.join(ROOT, 'src/')
    ],
    //shell上输出内容
    stats: {
        colors: true,
        chunks: false
    },
    //开启服务并配置局域网访问
    disableHostCheck: true,
    hot: true,
    inline: true,
    host: '0.0.0.0',
    //自动打开
    open: true
}
//添加包含HMR入口起点
WebpackDevServer.addDevServerEntrypoints(devWebpackConfig, options)

const compiler = webpack(devWebpackConfig);
const server = new WebpackDevServer(compiler,options)


server.listen(8888, 'localhost', () => {
    console.log('正在构建开发环境，开发环境地址为localhost:8888')
})
