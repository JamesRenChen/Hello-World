const path = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')

// 先进入 template 目录
process.chdir(path.join(__dirname, 'template'))

// 每次开始前 删除 dist 文件夹
rimraf('./dist', () => {
    const prodConfig = require('../../lib/webpack.prod')

    webpack(prodConfig, (err, stats) => {
        if (err) {
            console.log(err)
            process.exit(2)
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false
        }))
    })
})