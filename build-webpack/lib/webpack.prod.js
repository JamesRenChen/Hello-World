const cssnano = require('cssnano');
const merge = require('webpack-merge');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const baseConfig = require('./webpack.base');

const prodConfig = {
    mode: 'production',
    plugins: [
    // 代码压缩
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g, // 正则表达式，用于匹配需要优化或者压缩的资源名。默认值/\.css$/g
            cssProcessor: cssnano, // 用于压缩和优化CSS 的处理器，默认是 cssnano.这是一个函数，应该按照 cssnano.process 接口(接受一个CSS和options参数，返回一个Promise)
            canPrint: true, // 表示插件能够在console中打印信息，默认值是true
        }),
        // 公共资源包提取, 基础库不打包，直接CDN引入
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://unpkg.com/react@16/umd/react.development.js',
                    global: 'React',
                },
                {
                    module: 'react-dom',
                    entry: 'https://unpkg.com/react-dom@16/umd/react-dom.development.js',
                    global: 'ReactDOM',
                },
            ],
        }),
    ],
    optimization: {
        minimize: true, // 如果mode是production类型，minimize的默认值是true，执行默认压缩
        minimizer: [], // 如果想使用第三方的压缩插件也可以在optimization.minimizer的数组列表中进行配置
        // SplitChunksPlugin引入了 chunkGroup 的概念，在入口chunk和异步chunk中发现被重复使用的模块，将重叠的模块以vendor-chunk的形式分离出来，也就是vendor-chunk可能有多个，不再受限于是所有chunk中都共同存在的模块
        // SplitChunksPlugin在production模式下是默认开启的，但是它默认只作用于异步chunk
        // 如果要作用于入口chunk的话，需要配置optimization.splitChunks.chunks: "all"，同时webpack自动split chunks是有几个限制条件的:
        // 1、新产出的vendor-chunk是要被共享的，或者模块来自npm包
        // 2、新产出的vendor-chunk的大小得大于30kb
        // 3、并行请求vendor-chunk的数量不能超出5个
        // 4、对于entry-chunk而言，并行加载的vendor-chunk不能超出3个
        splitChunks: {
            chunks: 'all', // 默认作用于异步chunk，值为all/initial/async/function(chunk),值为function时第一个参数为遍历所有入口chunk时的chunk模块，chunk._modules为chunk所有依赖的模块，通过chunk的名字和所有依赖模块的resource可以自由配置,会抽取所有满足条件chunk的公有模块，以及模块的所有依赖模块，包括css
            minSize: 0, // 表示在压缩前的最小模块大小,默认值是30kb
            minChunks: 1, // 表示被引用次数，默认为1
            maxAsyncRequests: 5, // 所有异步请求不得超过5个
            maxInitialRequests: 3, // 初始化并行请求不得超过3个
            automaticNameDelimiter: '~', // 名称分隔符，默认是~
            name: true, // 打包后的名称，默认是chunk的名字通过分隔符（默认是~）分隔
            // 设置缓存组用来抽取满足不同规则的chunk
            cacheGroups: {
                commons: {
                    name: 'commons', // 抽取的chunk名字
                    chunks: 'all', // 同外层的参数配置，覆盖外层的chunks，以chunk为维度进行抽取
                    minChunks: 2, // 最少被几个chunk引用
                    // 可以为字符串，正则表达式，函数，以module为维度进行抽取，只要是满足条件的module都会被抽取到该common的chunk中，
                    // 为函数时第一个参数是遍历到的每一个模块，第二个参数是每一个引用到该模块的chunks数组。自己尝试过程中发现不能提取出css，待进一步验证。
                    // test: /(react|react-dom)/,
                    // test(module, chunks) {},
                    priority: 10, // 优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中
                    reuseExistingChunk: true, // 如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
                    enforce: true, // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize

                },
                vendors: {
                    name: 'vendors',
                    test: /(react|react-dom)/,
                    chunks: 'all',
                },
            },
        },
    },
};

module.exports = merge(baseConfig, prodConfig);
