/**
 * 引用处理逻辑
 * notFound(req, res): 未找到匹配请求路径
 * getRequest(req, res): 返回请求信息
 * getPart(req, res, param): 返回请求部分信息
 * getDb(req, res): 返回数据库 db 表的 Db 字段值
 */
const { notFound, getRequest, getPart, getDb } = require('./a.controller')

// 配置路由规则以及对应的处理函数
const RULE_LIST = {
    '/': getRequest,            // 返回整个请求信息
    '/:part': getPart,          // 返回请求部分信息
    '/db': getDb,               // 返回数据库信息
    '*': notFound,              // 404 处理
}

/**
 * 根据路由规则生成正则表达式
 * @param {string} rule 路由规则
 */
const generateReg = rule => {
    let reg = ''
    if (rule.indexOf('/') > -1) {
        // 正则表达式数组
        let regList = []
        // 占位符替换成正则表达式
        rule.split('/').forEach(str => {
            regList.push(str === '' ? '' : str.replace(/\:(.*)/, '([^\\/]+?)').replace('*', '\\*'))
        })
        // 拼接路由规则正则表达式字符串
        reg = '^' + regList.join('\\/') + '(?:\\/)?$'
    } else {
        reg = '.*'
    }
    return new RegExp(reg)
}

/**
 * 路由解析函数
 */
const parse = (req, res) => {
    // 获取 URL 字符串
    const path = req.url
    // 获取请求路径和请求字符串，请求字符串默认为空字符串
    const [pathName, search = ''] = path.split('?')
    // 路由参数
    let pathParam = {}
    // 请求参数
    let searchParam = {}
    // 请求体
    let body = ''
    // 监听请求发送请求体
    req.on('data', chunk => {
        body += chunk
    })
    
    console.log(1111111111111)
    console.log(path)
    console.log(pathName)
    console.log(search)
    // 请求体接收结束，开始解析路由
    req.on('end', () => {
        // 将请求字符串转换为对象
        search.split('&').forEach(str => {
            const [key, value = ''] = str.split('=')
            searchParam[key] = value
        })
        // 逐个匹配路由解析规则
        for (let rule in RULE_LIST) {
            // 根据正则表达式进行匹配
            console.log(2222222222)
            console.log(generateReg(rule))
            console.log(generateReg(rule).test(pathName))

            if (generateReg(rule).test(pathName)) {
                // 解析路由参数
                rule.split('/').forEach((str, idx) => {
                    if (str.indexOf(':') === 0) {
                        pathParam[str.replace(':', '')] = pathName.split('/')[idx]
                    }
                })
                // 执行路由规则对应的函数
                let fn = RULE_LIST[rule] || function () { return true }
                let toContinue = fn(Object.assign({ body, pathParam, searchParam }, req), res)
                // 是否继续匹配其他路由
                if (!toContinue) break
            }
        }
    })
}

module.exports = parse
