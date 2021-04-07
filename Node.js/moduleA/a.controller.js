const mysql = require('mysql')
// 创建连接
let con = mysql.createConnection({
    host: 'node-db',            // 数据库域名
    user: 'root',               // 数据库用户名
    password: 'mysql',          // 数据库用户密码
    database: 'mysql',          // 需要连接的数据库名
})
// 开始连接
con.connect()

let ctrl = {}

/**
 * 返回请求信息
 * @param {httpRequest} req 请求实例
 * @param {httpResponse} res 响应实例
 */
ctrl.getRequest = (req, res) => {
    // 解构获取 URL，请求方法、头部对象
    const { url, method,headers, body } = req
    // 设置请求头部，返回内容为 json
    res.setHeader('Content-Type', 'application/json')
    // 设置状态信息
    res.writeHeader(200, 'GOOD')
    // 响应请求信息
    res.write(JSON.stringify({
        url,
        method,
        headers,
        body
    }))
    res.end()
}

/**
 * 返回部分请求信息
 * @param {httpRequest} req 请求实例
 * @param {httpResponse} res 响应实例
 * @param {Object} param 参数对象（路由参数和请求参数）
 */
ctrl.getPart = (req, res) => {
    // 设置头部请求，返回内容为 json
    res.setHeader('Content-Type', 'application/json')

    switch (req.pathParam.part) {
        case 'url': // 返回请求 URL
            res.end(JSON.stringify({
                url: req.url
            }))
            break
        case 'header': // 返回请求头部
            res.end(JSON.stringify(req.headers))
            break
        case 'header': // 返回请求主体
            res.end(JSON.stringify({
                body: req.body
            }))
            break
        default: // 未匹配参数信息，继续其他操作
            return true
    }
}

/**
 * 未找到匹配路径
 * @param {httpRequest} req 请求实例
 * @param {httpResponse} res 响应实例
 */
ctrl.notFound = (req, res) => {
    console.log(404)
    // 设置状态信息
    res.writeHeader(404, 'NotFound')
    // 发送请求
    res.end()
}

/**
 * 返回数据库 db 表的 Db 字段值
 * @param {httpRequest} req 请求实例
 * @param {httpResponse} res 响应实例
 */
 ctrl.getDb = (req, res) => {
    con.query('select db from db', (err, results, fields) => {
        if (err) throw err;
        res.end(JSON.stringify(results))
    })
}

module.exports = ctrl
