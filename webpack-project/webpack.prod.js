'use strict'

const webpack = require('webpack')
const glob = require('glob')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const ModuleConcatenationPlugin = require('module')
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const setMPA = () => {
    const entry = {}
    const htmlWebpackPlugins = []
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index]
            const match = entryFile.match(/src\/(.*)\/index\.js/)
            const pageName = match && match[1]
            entry[pageName] = entryFile
            htmlWebpackPlugins.push(
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
        
    console.log('entry', entry)
    return {
        entry,
        htmlWebpackPlugins
    }
}
const { entry, htmlWebpackPlugins } = setMPA()
module.exports = {
    // 入口 单入口：字符串  多入口：对象
    entry: entry,
    // 输出 单入口：文件名  多入口：替换符 [name]
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name]_[chunkhash:8].js"
        // filename: 'bundle.js'
    },
    // 用来指定当前的构建环境是：production, development, none
    // 设置mode可以使用webpack内置的函数，默认是production，对应开启优化plugins
    mode: 'none',
    module: {
        // loader 放在这里
        // test 指定匹配规则
        // use 指定使用的 loader 名称
        rules: [
            {test: /\.txt$/, use: 'raw-loader'},
            // js
            {
                test: /\.js$/, 
                use: [
                    'babel-loader',
                    'eslint-loader'
                ]
            },
            {
                test:/\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },  // loader 调用为链式调用，执行顺序为从右往左
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader, // creats style nodes from JS Strings
                    'css-loader', // translates CSS into CommonJS
                    {
                        loader: 'px2rem-loader',
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
            },
            // 文件指纹
            {
                test: /\.(png|jpg|jpeg|gif)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8][ext]'
                        }
                    }
                ]
            },
            {
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
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
        // new HtmlWebpackExternalsPlugin({
        //     externals: [
        //         {
        //             module: 'react',
        //             entry: 'https://unpkg.com/react@16/umd/react.development.js',
        //             global: 'React'
        //         },
        //         {
        //             module: 'react-dom',
        //             entry: 'https://unpkg.com/react-dom@16/umd/react-dom.development.js',
        //             global: 'ReactDOM'
        //         }
        //     ]
        // })
    ].concat(htmlWebpackPlugins),
    // devtool: 'source-map',
    optimization: {
        splitChunks: {
            minSize: 0, 
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2
                },
                vendors: {
                    name: 'vendors',
                    test: /(react|react-dom)/,
                    chunks: 'all'
                }
            }
        }
    }
}

