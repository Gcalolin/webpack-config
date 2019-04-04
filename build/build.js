
var chalk = require('chalk');
var webpack = require('webpack');

var buildWebpackConfig = require('./webpack.build.config')
var testWebpackConfig = require('./webpack.test.config');

console.log('开始打包正式环境代码');
webpack(buildWebpackConfig, function(err, stuts) {
    if(err) throw err
    process.stdout.write(stuts.toString({
        color: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n')
    console.log(chalk.cyan('正式环境打包成功'));
    parcelTest();
})


function parcelTest() {
    console.log('开始打包测试环境代码')
    webpack(testWebpackConfig, function(err, stuts) {
        if(err) throw err
        process.stdout.write(stuts.toString({
            color: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')
        console.log(chalk.cyan('测试环境打包成功'));
    })
}