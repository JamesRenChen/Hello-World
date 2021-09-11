"use strict"

const http = require('http')
const connect = require('connect')

// http.createServer((req, res) => {
//   console.log(req)
//   const { url = '' } = req
//   if (url === '/') {
//     res.end('Hello NodeJs')
//   } else if (url === '/2') {
//     res.end('<h1>Hello NodeJs 222</h1>')
//   } else {
//     res.end('Hello NodeJs Other')
//   }
// })
// .listen(3000, '127.0.0.1')


const app = connect()

app.use('/', function fooMiddleware(req, res, next) {
    console.log(111111111)
    console.log(req)
    res.end('Hello NodeJs')
})

app.use('/2', function fooMiddleware(req, res, next) {
    console.log(2222222222)
    res.end('<h1>Hello NodeJs 222</h1>')
})

// use 方法未指定路径，应该放在最后执行，它会响应所有请求
app.use(function(req, res) {
    res.end('Hello NodeJs Other')
})

http.createServer(app).listen(3000)
console.log('Server running at http://127.0.0.1:3000/')


