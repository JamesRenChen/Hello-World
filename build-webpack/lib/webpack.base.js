const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 多页面打包
const setMPA = () => {
    const entry = {}
    const htmlWebpackPlugins = []
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
    Object.keys(entryFiles).map((index) => {
        const entryFile = entryFiles[index]
        const match = entryFile.match(/src\/(.*)\/index\.js/)
        const pageName = match && match[1]
        entry[pageName] = entryFile
        htmlWebpackPlugins.push(
            // 自动生成html文件 
            new HtmlWebpackPlugin({
                template: path.join(__dirname, `src/${pageName}/${pageName}.html`),
                filename: `${pageName}.html`,
                chunks: ['vendors', pageName],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false
                }
            })
        )
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}
const { entry, htmlWebpackPlugins } = setMPA()


module.exports = {
    entry: entry, // 入口 单入口：字符串  多入口：对象
    module: {
        // 资源解析 loaders
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader', // ES6解析
                    // 'eslint-loader' // eslint解析
                ]
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // creats style nodes from JS Strings
                    'css-loader' // css解析
                ]
            }, {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader, // creats style nodes from JS Strings
                    'css-loader', // translates CSS into CommonJS
                    {
                        loader: 'px2rem-loader', // px 转化为 rem
                        options: {
                            remUnit: 75,
                            remPrecesion: 8
                        }
                    },
                    'less-loader', // compiles Less to CSS
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 2 version', '>1%', 'ios >= 7']
                                })
                            ]
                        }
                    }
                ]
            }, {
                test: /\.(png|jpg|jpeg|gif)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8][ext]'
                        }
                    }
                ]
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8][ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 目录清理
        new CleanWebpackPlugin(),
        // 命令行信息显示优化
        new FriendlyErrorsWebpackPlugin(),
        // 构建异常错误码捕获
        function () { 
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watrch') == -1) {
                    console.log('build error')
                    process.exit(1)
                }
            })
        },
        // CSS 提取为单独文件
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
    ].concat(htmlWebpackPlugins),
    stats: 'errors-only' // 命令行信息只显示errors
}