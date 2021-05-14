const path = require('path');
const { merge } = require('webpack-merge');
const baseWebpack = require('./webpack.base');

module.exports = merge(baseWebpack, {
  mode: 'production', // 选择当前的开发模式
});
