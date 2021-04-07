const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const os = require('os');
const baseConfig = require('./webpack.base');

// 动态获取host，例如如果想让局域网内的其他用户访问自己的设备，可以将host配置为自己本机的IP地址
const arr = [];
Object.keys(os.networkInterfaces()).forEach((key) => {
    os.networkInterfaces()[key].forEach((item) => {
        if (item.family === 'IPv4' && item.address.indexOf('192.168.') !== -1) {
            arr.push(item.address);
        }
    });
});
const [HOST] = arr;

const devConfig = {
    mode: 'development',
    plugins: [
    // 热加载插件(不建议)
        new webpack.HotModuleReplacementPlugin(),
    ],
    /**
     * webpack-dev-server是一个使用了express的Http服务器，
     * 它的作用主要是为了监听资源文件的改变，该http服务器和client使用了websocket通信协议，只要资源文件发生改变，webpack-dev-server就会实时的进行编译。
     */
    devServer: {
    /**
         * 该配置项指定了服务器资源的根目录，如果不配置contentBase的话，那么contentBase默认是当前执行的目录,一般是项目的根目录
         * 配置了 contentBase后，服务器就指向了资源的根目录，而不再指向项目的根目录
         */
        contentBase: path.join(__dirname, 'dist'),
        // 端口号，默认 8080，支持命令行
        port: 8080,
        /**
         * 该配置项用于配置 DevServer的服务器监听地址;host的默认地址是127.0.0.1，支持命令行
         */
        host: HOST,
        // 该配置项可以在HTTP响应中注入一些HTTP响应头
        headers: { },
        /**
         * 该配置项属性是用来应对返回404页面时定向跳转到特定页面的,
         * 一般是应用在 HTML5中History API 的单页应用，简易配置true，比如在访问路由时候，访问不到该路由的时候，会跳转到index.html页面。
         */
        historyApiFallback: {
            // 使用正则来匹配路由
            rewrites: [
                { from: /^\/home/, to: '/home.html' },
                { from: /^\/user/, to: '/user.html' },
            ],
        },
        /**
         * 该配置项是指模块替换换功能，DevServer 默认行为是在发现源代码被更新后通过自动刷新整个页面来做到实时预览的
         * 但是开启模块热替换功能后，它是通过在不刷新整个页面的情况下通过使用新模块替换旧模块来做到实时预览的。
         * 当然我们也可以在scripts命令行中配置，--hot
         */
        hot: true,
        /**
         * webpack-dev-server 有两种模式可以实现自动刷新和模块热替换机制
         * false iframe模式，页面是被嵌入到一个iframe页面，并且在模块变化的时候重载页面
         *  1. 在网页中嵌入了一个iframe，将我们自己的应用代码注入到 这个 iframe中去了。
         *  2. 在页面头部会有一个 App ready. 这个提示，用于显示构建过程的状态信息。
         *  3. 加载了 live.bundle.js文件，还同时包含了 socket.io的client代码，进行了 websocket通讯，从而完成了自动编译打包，页面自动刷新功能。
         * true inline模式,它在构建变化后的代码会通过代理客户端来控制网页刷新
         *  1. 构建的消息在控制台中直接显示出来。
         *  2. socket.io的client代码被打包进bundle.js当中，这样就能和websocket通讯，从而完成自动编译工作，页面就能实现自动刷新功能。
         *  3. 以后的每一个入口文件都会插入上面的socket的一段代码，这样会使的打包后的bundle.js文件变得臃肿。
         */
        inline: true,
        // 该属性用于DevServer启动且第一次构建完成时，自动使用我们的系统默认浏览器去打开网页
        open: true,
        // 该属性是用来在编译出错的时候，在浏览器页面上显示错误。该属性值默认为false，需要的话，设置该参数为true。
        overlay: false,
        /**
         * 该属性配置是用来在编译的时候再命令行中输出的内容
         * errors-only 只打印错误
         * minimal
         * normal
         * verbose
         */
        stats: 'errors-only',
        // 该属性是一个布尔型的值，默认为false，当他为true的时候，它会对所有服务器资源采用gzip进行压缩。
        compress: false,
        /**
         * 实现跨域
         * 我们使用webpack在本地启动服务器的时候，由于我们使用的访问的域名是 http://localhost:8081 这样的，但是我们服务端的接口是其他的，
         * 那么就存在域名或端口号跨域的情况下，但是很幸运的是 devServer有一个叫proxy配置项，
         * 可以通过该配置来解决跨域的问题，那是因为 dev-server 使用了 http-proxy-middleware 包
         */
        proxy: {
            '/api': {
                target: 'http://news.baidu.com', // 目标接口域名
                secure: false, // https 使用该参数
                changeOrigin: true, // 是否跨域
                pathRewrite: { // 重写路径
                    '^/api': '',
                },
            },
        },
    },
    /**
     * eval： 使用eval包裹模块代码
     * cheap： 不包含列信息（关于列信息的解释下面会有详细介绍)也不包含loader的sourcemap
     * module： 包含loader的sourcemap（比如jsx to js ，babel的sourcemap）
     * inline： 将.map作为DataURI嵌入，不单独生成.map文件（这个配置项比较少见）
     * source-map： 产生.map文件
     *
     * 主要区别一个体现在重构的性能上，总的来说eval性能最好，source-map性能最低，但就我自身的实践来看大多用的是最完整的source-map，
     * 该模式对于不管是js还是css，scss等都能很好的覆盖， 相反其他模式都不完整， 在开发环境下重构性能似乎比不上功能的完善。
     * 开发环境：eval, eval-source-map, cheap-eval-source-map, cheap-module-eval-source-map, cheap-module-source-map
     * 生产环境：source-map hidden-source-map nosources-source-map
     */
    devtool: 'source-map',
};

module.exports = merge(baseConfig, devConfig);
