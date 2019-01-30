const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
//console.log(isDev,'isDev')

module.exports = {
  //入口文件的路径
  entry:path.resolve(__dirname,'../src/index.js'),
  //出口文件的路径
  output:{
    path:path.resolve(__dirname,'../dist'),
    filename:isDev?'js/[name].js':'js/[name].[contenthash:8].js',
    chunkFilename: isDev?"js/[name].js":"js/[name].[contenthash:8].js",
    publicPath:"/",
  },
  module:{
    rules:[
      {
        test: /(\.js|\.jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use:[
          isDev?'style-loader':MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('autoprefixer')(),
              ]
            }
          },
        ]
      },
      {
        test:/\.less$/,
        use:[
          isDev?'style-loader':MiniCssExtractPlugin.loader,
          'css-loader', 
          {
            loader:'postcss-loader',
            options:{
              plugin:(loader)=>[
                require('autoprefixer')(),
              ]
            }
          },
        ]
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|gif)(\?|$)/,
        loader: 'file-loader?name=[hash].[ext]'
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        loader: 'url-loader',
        options:{
          limit: 1200,
          name: "[name].[hash:4].[ext]",
          outputPath: "./images",//打包后图片文件输出路径
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      chunksSortMode: 'none'
    }),
  ],
}

