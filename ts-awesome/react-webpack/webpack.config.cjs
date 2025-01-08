// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
// 生成 HTML 文件，将打包后的资源 (JS, CSS) 注入到 HTML 文件中
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 从 JS 中提取 CSS 为单独的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProduction = process.env.NODE_ENV === 'production';
// 生产环境使用 MiniCssExtractPlugin.loader, 将 CSS 提取为单独的文件
// 开发环境使用 style-loader, 将 CSS 注入到 HTML 文件的 style 标签中
const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader';

const config = {
  entry: './src/index.tsx', // 入口文件
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录
  },
  devServer: {
    // 开发环境的服务器
    open: true, //           自动打开浏览器
    host: 'localhost', // 服务器的主机 localhost
  },
  plugins: [
    // 生成 HTML 文件，将打包后的资源 (JS, CSS) 注入到 HTML 文件中
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    // 模块加载规则
    rules: [
      {
        // 匹配 .js .jsx 文件, 使用 babel-loader 处理
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },

      {
        // 匹配 .ts .tsx 文件, 先使用 ts-loader 处理, 再使用 babel-loader 处理
        test: /\.(ts|tsx)$/i,
        // loader: 'ts-loader',
        use: ['babel-loader', 'ts-loader'],
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    // 导入模块时, 自动添加文件扩展名
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = 'development';
  }
  return config;
};
