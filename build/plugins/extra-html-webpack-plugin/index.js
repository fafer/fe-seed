const HtmlWebpackPlugin = require('html-webpack-plugin');

class ExtraHtmlWebpackPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('ExtraHtmlWebpackPlugin', compilation => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'ExtraHtmlWebpackPlugin',
        (data, cb) => {
          // console.log('================='+JSON.stringify(data.html));
          cb(null, data);
        }
      );
    });
  }
}

module.exports = ExtraHtmlWebpackPlugin;
