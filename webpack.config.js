const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = '../'

const parseEntry = require('./build/entry.js')

module.exports = async (options = {}) => {
  let mode = options.dev ? 'development' : 'production'
  let entry = await parseEntry()
  let plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(mode)
      }
    })
  ]
  Object.keys(entry).forEach((name) => {
    if (RegExp('^lib/').test(name)) {
      return
    }
    let dir = name.replace('modules', 'pages')
    plugins.push(
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: `${dir}.html`,
        chunks: ['lib/vendor', 'lib/manifest', name],
        hash: true
      })
    )
  })

  return {
    entry: entry,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
      chunkFilename: '[name].js?[chunkhash]',
      publicPath: options.dev ? '/' : publicPath
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: ['vue-loader']
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['env'],
            plugins: [
              // ['component',
              //   {
              //     libraryName: 'element-ui',
              //     styleLibraryName: 'theme-chalk'
              //   }
              // ],
            //   ['import',
            //     {
            //       libraryName: 'iview',
            //       libraryDirectory: 'src/components'
            //     }
            //   ]
            ]
          }
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }]
        }
      ]},
    plugins: plugins,
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'lib/vendor',
            priority: 10,
            enforce: true
          }
        }
      }
    },
    externals: {
      'element-ui': 'element-ui'
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src')
      }
    },
    devServer: {
      host: '127.0.0.1',
      port: 8000,
      proxy: {
        '/api/': {
          target: 'http://127.0.0.1:8080',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      },
      historyApiFallback: {
        index: url.parse(options.dev ? '/assets/' : publicPath).pathname
      }
    },
    mode,
    devtool: options.dev ? '#cheap-module-eval-source-map' : '#source-map'
  }
}
