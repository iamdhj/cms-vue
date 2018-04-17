const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const apiMocker = require('webpack-api-mocker')
const url = require('url')
const publicPath = '/demo/cms-vue/'

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
    // new CopyWebpackPlugin(['test/mock/**/*.json'])
  ]
  Object.keys(entry).forEach((name) => {
    if (RegExp('^lib/').test(name)) {
      return
    }
    let dir = name.replace('modules', 'pages')
    plugins.push(
      new HtmlWebpackPlugin({
        template: 'src/template/index.html',
        filename: `${dir}/index.html`,
        chunks: ['lib/vendor', 'lib/iview', 'lib/core', 'lib/config', 'runtime', name],
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
      publicPath: publicPath
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
          loader: 'babel-loader'
        },
        {
          test: /\.scss$/,
          use: ['style-loader',
            {
              loader: 'css-loader',
              options: {
                alias: {
                  '*assets': path.resolve(__dirname, 'src/assets')
                }
              }
            },
            'sass-loader', 'postcss-loader']
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
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          core: {
            test: /src\/lib/,
            chunks: 'initial',
            name: 'lib/core',
            enforce: true,
            minSize: 1,
            priority: 1
          },
          config: {
            test: /src\/config/,
            chunks: 'initial',
            name: 'lib/config',
            enforce: true,
            minSize: 1,
            priority: 1
          },
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'lib/vendor',
            priority: 8
          },
          iview: {
            test: /node_modules\/iview/,
            chunks: 'initial',
            name: 'lib/iview',
            priority: 10
          }
        }
      }
    },
    resolve: {
      alias: {
        '*': path.resolve(__dirname, 'src'),
        '*lib': path.resolve(__dirname, 'src/lib'),
        '*style': path.resolve(__dirname, 'src/style'),
        '*net': path.resolve(__dirname, 'src/lib/net.js'),
        '*utils': path.resolve(__dirname, 'src/lib/utils.js'),
        '*urls': path.resolve(__dirname, 'src/config/urls.js')
      }
    },
    devServer: {
      host: '127.0.0.1',
      port: 8000,
      historyApiFallback: {
        index: url.parse(options.dev ? '/assets/' : publicPath).pathname
      },
      before(app) {
        apiMocker(app, path.resolve('./test/mocker.js'))
      }
    },
    mode,
    devtool: options.dev ? '#cheap-module-eval-source-map' : '#hidden-source-map'
  }
}
