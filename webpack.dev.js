const path = require('path');
const { merge } = require('webpack-merge');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseWebpack = require('./webpack.base');
module.exports = merge(baseWebpack, {
  mode: 'development', // 选择当前的开发模式
  devServer: {
    https: false,
    host: '127.0.0.1', // 开发服务器的host
    port: 3003, // 开发服务器端口
    open: true, // 自动拉起浏览器
    openPage: false,
    compress: true, // 服务器是否启用gzip压缩
    // publicPath: '/shao/',  // 输出解析文件的目录，url 相对于 HTML 页面 output.publicPath 保持一致,如果不设置去output.publicPath的值，设置就去设置后的路径
    // contentBase: 'shao',  //contentBase是用来指定被访问html页面所在目录 ,一般不需要设置
    // clientLogLevel: "none",
    // 自动编译更新视图
    inline: true,
    //默认情况下，没有修改output.publicPath值，只需要设置webpack-dev-server的historyApiFallback配置：
    historyApiFallback: true,
    // proxy: {
    //   '/baseweb': {
    //     target: 'http://127.0.0.1:7001',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
  devtool: 'none', // 会生成对于调试的完整的.map文件，但同时也会减慢打包速度
});
