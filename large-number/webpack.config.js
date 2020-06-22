const TerserWebpackPlugin = require("terser-webpack-plugin")

module.exports = {
    mode: "none",
    entry: {
        "large-number": "./src/index.js",
        "large-number.min": "./src/index.js"
    },
    output: {
        filename: "[name].js",
        library: "RClargeNumber",
        libraryTarget: "umd",
        libraryExport: "default"
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                include: /\.min\.js$/,
            })
        ]
    }
}