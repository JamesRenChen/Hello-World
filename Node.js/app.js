// 引用 http 模块
const http = require('http')
const router = require('./moduleA/a.router')
// 创建服务器端
http.createServer(router)
// 监听 80 端口，输出启动日志
.listen(80, () => {
    console.log('listen on 80...')
})



// // 引用 http 模块
// const http = require('http')
// // 创建服务器端
// http.createServer((req, res) => {
//     // 结构获取 URL，请求方法，头部对象
//     const { url, method, headers } = req
//     // 请求头部对象并字符串化 无repalcer 2空格缩进
//     // const header = JSON.stringify(headers, null, 2) 
//     // 请求体
//     let body = ''
//     // 监听请求发送请求体
//     req.on('data', chunk => {
//         // 获取请求体数据
//         body += chunk
//     })
    
//     // 请求发送结束
//     req.on('end', () => {
//         // 设置响应头部，返回内容为 JSON
//         res.setHeader('Content-Type', 'application/json')
//         // 状态信息
//         res.statusCode = 200
//         res.statusMessage = 'OKOK'
//         res.writeHead(200, 'NewBee', {
//             'a': 'hehe',
//             'b': 'haha',
//         })
//         // 响应请求信息
//         res.write(JSON.stringify({
//             url,
//             method,
//             headers,
//             body
//         }))
//         // 发送请求
//         res.end(``)
//     })
// })
// // 监听 80 端口，输出启动日志
// .listen(80, () => {
//     console.log('listen on 80...')
// })
