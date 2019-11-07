/*
 * @Author: jingaier 
 * @Date: 2019-09-25 23:53:50 
 * @Last Modified by: jingaier
 * @Last Modified time: 2019-10-30 23:46:09
 */
const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: './src/app.jsx',
  output: {
    path      : path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename  : 'js/app.js'
  },
  resolve:{
    alias: {// 别名，减少层级写法
      page     : path.resolve(__dirname, 'src/page'),
      component: path.resolve(__dirname, 'src/component'),
      util: path.resolve(__dirname, 'src/util'),
      server: path.resolve(__dirname, 'src/server')
    }
  },
  module:{
    rules:[
      {// 转译js文件
        test: /\.jsx$/,   // 匹配特定文件的正则表达式或正则表达式数组
        //include: path.resolve(__dirname, 'src'),// 指定需要转译的文件夹
        //exclude: path.resolve(__dirname, 'node_modules'),// 指定转译时忽略的文件夹    
        exclude: /(node_modules)/,
        use    : {
          loader : 'babel-loader',   // 依赖的loader
          options: {
            presets: ['env','react']  // 最新标准
          }
        }
      },
      {//处理css
        test: /\.css$/,
        use : ExtractTextPlugin.extract({
          fallback: "style-loader",
          use     : "css-loader"
        })
      },
      {//sass
        test: /\.scss$/,
        use : ExtractTextPlugin.extract({
          fallback: "style-loader",
          use     : ["css-loader","sass-loader"]
        })
      },
      {//图片加载
        test: /\.(png|svg|jpg|gif)$/,
        use : [
          {
            loader : 'url-loader',
            options: {
              limit: 8192,
              name : 'resource/[name].[ext]'
            }
          }
        ]
      },
      {//字体图标的配置
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use : [
          {
            loader : 'url-loader',
            options: {
              limit: 8192,
              name : 'resource/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins:[
    //处理html文件
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      favicon:'./favicon.ico'// ico 格式的图标 放到文件根目录
    }),
    //new HtmlWebpackPlugin(),
    //独立css文件
    new ExtractTextPlugin("css/[name].css"),
    //提取 chunks 之间共享的通用模块
    new webpack.optimize.CommonsChunkPlugin({
      name:'common',
      filename:'js/base.js'
    })
  ],
  devServer:{
    port              : 8086,
    historyApiFallback: {//报404 默认显示的页面路径
      index: '/dist/index.html'
    },
    proxy:{// 代理 后端域名，不然前端请求跨域
      '/manage':{
        target:'http://admintest.happymmall.com',
        changeOrigin:true
      },
      '/user/logout.do':{
        target:'http://admintest.happymmall.com',
        changeOrigin:true
      }
    }
  }
};