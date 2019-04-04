


const path = require('path');
const Glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getEntries(enterPath) {
    var entries = {};
    Glob.sync(enterPath).forEach(item => {
        var pageName = item.replace(/.+pages\/(.+)\/index\.js/, '$1');
        entries[pageName] = item
    })
    return entries
}

function getHtmlTemplate(enterPath, isBuild) {
    var plugins = []
    Glob.sync(enterPath).forEach(item => {
        console.log('item', item);
        var config = {
            template: item,
            inject: 'body',
            minify: false
        }
        var chunks = [item.replace(/.+pages\/(.+)\/index\.html$/, '$1')];
        config.chunks = chunks;
        if(isBuild) {
            //打包构建
            config.filename = './pages/' + item.replace(/.+pages\/(.+)\/index(\.html)/, '$1$2');
        }else {
            config.filename = item.replace(/\/src/, '')
        }
        plugins.push(new HtmlWebpackPlugin(config))
    })
    return plugins
}

module.exports = {
    getEntries,
    getHtmlTemplate
}