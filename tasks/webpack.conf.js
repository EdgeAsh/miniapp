const { resolve } = require('path')
const r = url => resolve(__dirname, url)
const config = require('../config')
const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSass = new ExtractTextPlugin({
  filename: '[name].wxss'
})

// webpack配置文件
module.exports = {
  devtool: false,
  output: {
    path: config.assetsPath,
    filename: '[name].js'
  },
  resolve: {
    alias: {
      utils: r('../utils/utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'latest'
          ]
        }
      },
      {
        test: /\.sass$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => {
                  require('autoprefixer')({
                    browsers: [
                      'last 2 versions'
                    ]
                  })
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                indentedSyntas: true
              }
            }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.mina$/,
        loader: 'wechat-mina-loader',
        options: {
          dist: './mina'
        }
      }
    ]
  },
  plugins: [
    extractSass,
    new CopyWebpackPlugin([
      {
        from: {
          glob: 'pages/**/*.json',
          to: ''
        }
      },
      {
        from: 'static',
        to: 'static'
      }
    ]),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    }),
    new ProgressBarPlugin()
  ]
}