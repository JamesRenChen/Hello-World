const connect = require('connect')
const http = require('http')

const app = connect()

// 对响应进行 gzip 压缩
const compression = require('compression')
app.use(compression())

// 在浏览器缓存里存取会话状态
const cookieSession = require('cookie-session')
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}))

// 解析 urlencoded 的请求体，并赋值给 req.body
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// 响应所有请求
app.use(function(req, res) {
    res.end('Hello NodeJs Other')
})

http.createServer(app).listen(3000)