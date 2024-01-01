const path = require('path');
const webpack = require('webpack');
const shell = require('shelljs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development'; // 是否是开发模式

function init() {
  const nodeVersion = shell.exec('node -v', { silent: true });
  if (nodeVersion.trim().split('.')[0] !== 'v14') {
    throw new Error(`错误的版本号:${nodeVersion}, node 版本必须是 v14`);
  }

  const npmVersion = shell.exec('npm -v', { silent: true });
  if (npmVersion.trim().split('.')[0] < 5) {
    throw new Error(`错误的npm版本号:${npmVersion}, npm 版本必须大于5.0.0`);
  }
}

// 初始化环境
init();
const config = {
  // 入口文件
  entry: path.join(__dirname, '../src/index.js'),
  // 出口文件
  output: {
    filename: 'static/js/[name].js', // 每个输出js的名称
    path: path.join(__dirname, '../dist'), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: '/' // 打包后文件的公共前缀路径
  },
  module: {
    rules: [
      {
        // 匹配js/jsx
        test: /.(js|jsx)$/,
        // 排除node_modules
        exclude: /node_modules/,
        use: ['thread-loader', 'babel-loader'],
        include: [path.resolve(__dirname, '../src')] // 只对项目src文件的js,jsx进行loader解析
      },
      {
        test: /\.css$/, // 匹配所有的 css 文件
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/, // 匹配所有的 less 文件
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/, // 匹配所有的 scss 文件
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/images/[name][ext]' // 文件输出目录和命名
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname, '../node_modules')]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
      inject: true // 自动注入静态资源
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    })
  ],
  cache: {
    type: 'filesystem' // 使用文件缓存
  }
};

module.exports = config;
