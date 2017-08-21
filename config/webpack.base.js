const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = function () {
  return {
    context: resolve('src'),
    entry: {
      bundle: 'index.js',
    },
    output: {
      path: resolve('dist'),
      filename: '[name].js',
      sourceMapFilename: '[name].map',
    },
    resolve: {
      extensions: ['.js', '.html'],
      modules: ['src', 'node_modules'],
    },
    module: {
      rules: [{
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      }, {
        test: /\.(png|jpg|ttf|woff|svg|otf|eot|svg).*?$/,
        loader: 'file-loader',
        options: {
          name: '[sha512:hash:base64:3].[ext]',
        }
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: 'index.ejs',
        minify: {
          collapseInlineTagWhitespace: true,
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
        }
      }),
    ]
  };
};