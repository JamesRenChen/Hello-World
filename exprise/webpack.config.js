const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './app.js', // 入口文件
  output: {          // 配置对象
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,  // 代表我们希望 Webpack 对哪种类型的文件使用该 loader。通过正则匹配我们找出符合要求的以 .css 结尾文件名的文件
        loader: 'style-loader!css-loader'  // 对所匹配到文件进行处理的 loader 的名字
      }
    ]
  },
  plugins: [
      new UglifyJSPlugin()
  ],
  devServer: {
    port: 3000, // 服务端口
    publicPath: '/dist/' // 打包后资源路径
  }
}