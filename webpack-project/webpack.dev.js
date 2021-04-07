'use strict'

const glob = require('glob')
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin') // 优化构建时命令行显示日志的插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// const setMPA = () => {
//     const entry = {}
//     const htmlWebpackPlugins = []
//     const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
//     Object.keys(entryFiles)
//         .map((index) => {
//             const entryFile = entryFiles[index]
//             const match = entryFile.match(/src\/(.*)\/index\.js/)
//             const pageName = match && match[1]
//             entry[pageName] = entryFile
//             htmlWebpackPlugins.push(
//                 new HtmlWebpackPlugin({
//                     template: path.join(__dirname, `src/${pageName}/${pageName}.html`),
//                     filename: `${pageName}.html`,
//                     chunks: [pageName],
//                     inject: true,
//                     minify: {
//                         html5: true,
//                         collapseWhitespace: true,
//                         preserveLineBreaks: false,
//                         minifyCSS: true,
//                         minifyJS: true,
//                         removeComments: false
//                     }
//                 })
//             )
//         })
//     return {
//         entry,
//         htmlWebpackPlugins
//     }
// }
// const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
    // 入口 单入口：字符串  多入口：对象
    entry: ['@babel/polyfill', './main.js'],
    // entry: entry,
    // 输出 单入口：文件名  多入口：替换符 [name]
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: "[name].js"
        filename: 'bundle.js'
    },
    resolve: {
        symlinks: false,
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
        },
        extensions: ['.js', '.json', '.vue', '.less', '.css', '.ts']
    },
    // 用来指定当前的构建环境是：production, development, none
    // 设置mode可以使用webpack内置的函数，默认是production，对应开启优化plugins
    mode: 'development',
    module: {
        // loader 放在这里
        // test 指定匹配规则
        // use 指定使用的 loader 名称
        rules: [
            {test: /\.txt$/, use: 'raw-loader'},
            // js
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'main.js'),
                    path.resolve(__dirname, 'app.vue'),
                    path.resolve(__dirname, 'node_modules/element-ui'),
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                    },
                    'postcss-loader'
                ]
            },
            // {test:/\.css$/, use: ['style-loader', 'css-loader']},  // loader 调用为链式调用，执行顺序为从右往左
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                    },
                    'less-loader', // 将 Less 编译为 CSS
                ]
            },
            // 静态资源
            // {test: /\.(png|jpg|jpeg|gif)$/, use: 'file-loader'}, // 图片
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'images/[hash].[ext]',
                        limit: 10000
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'fonts/[hash].[ext]',
                        limit: 10000
                    }
                }]
            },
        ]
    },
    // 轮询判断文件的最后修改时间是否发生变化，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout
    // 默认false
    watch: false,
    // 只有开启监听模式，watchOptions 才有意义
    watchOptions: {
        // 默认为空，不监听的文件或者文件夹，支持正则
        ignored: /node_modules/,
        // 监听到变化后会会等300ms再去执行，默认300ms
        aggregateTimeout: 300,
        // 判断文件是否发生变化是通过不停询问系统指定文件有没有发生变化实现的，默认每秒询问1000次
        poll: 1000
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, `./index.html`),
            filename: `index.html`,
        }),
        new VueLoaderPlugin(),
    ],
    // ].concat(htmlWebpackPlugins),
    devServer: {
        contentBase: './dist',
        hot: true,
        stats: 'errors-only'
    },
    devtool: 'inline-source-map'
}

