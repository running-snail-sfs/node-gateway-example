const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename:'js/[name].[chunkhash:8].js',
    path: path.resolve(__dirname, './dist'), 
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'], 
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },

      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader?localIdentName:[name]--[local]--[hash:base64:5]',
            options: {
              modules: {
                localIdentName: '[name]__[local]_[hash:base64:5]',
              },
            },
          },
          'less-loader',
        ],
        exclude: /(node_modules)/, 
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        exclude: /(node_modules)/,
      },
      // 处理图片
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      // 图像处理
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          limit: 10 * 1024,
          noquotes: true,
        },
      },
    ],
  },
  plugins: [
    // 打包进度条显示，可以查看到打包进度百分比
    new SimpleProgressWebpackPlugin(),
    new CleanWebpackPlugin(), // 打包的时候清除之前的代码
    // css分离并命hash名
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:7].css',
    }),
    new HtmlWebpackPlugin({
      inject: true, // 设为 true 表示把JS文件注入到body结尾，CSS文件注入到head中
      template: './src/public/index.html', // 指定要打包的html路径和文件名
      filename: './index.html', // 指定输出路径和文件名 相对于output.path
      // favicon: "", //给生成的 html 文件生成一个标签<link rel="shortcut icon" href="apple-touch-icon.png">
      // hash: true, //给生成的 js 文件一个独特的 hash 值 <script type=text/javascript src=bundle.js?22b9692e22e7be37b57e></script>
      showErrors: true, // webpack 编译出现错误
      minify: {
        // 对 html 文件进行压缩，minify 的属性值是一个压缩选项或者 false 。默认值为false, 不对生成的 html 文件进行压缩
        // 对 html 文件进行压缩，minify 的属性值是一个压缩选项或者 false 。默认值为false, 不对生成的 html 文件进行压缩
        removeComments: true, // 去除注释
        collapseWhitespace: true, // 是否去除空格
        minimize: true, // 打包为最小值
        removeAttributeQuotes: true, // 去除引号
        removeComments: true, // 去除注释
        collapseWhitespace: true, // 去除空格
        minifyCSS: true, // 压缩html内css
        minifyJS: true, // 压缩html内js
      },
    }),
  ],
  optimization: {
    concatenateModules: true,
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: true,
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         name: 'vendor',
  //         test: /[\\/]node_modules[\\/]/,
  //         chunks: 'all',
  //         priority: 10, // 优先级
  //       },
  //       common: {
  //         name: 'common',
  //         test: /[\\/]src[\\/]/,
  //         minSize: 1024,
  //         chunks: 'all',
  //         priority: 5,
  //       },
  //     },
  //   },
  // },
};
