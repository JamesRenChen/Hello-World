const Koa = require('koa')
const app = new Koa()

// 日志中间件
app.use(async (ctx, next) => {
    const start = new Date()

    console.log('[logger middleware] brfore await...')
    await next()
    console.log('[logger middleware] after await...')

    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 响应
app.use(async ctx => {
    console.log('[response middleware] response...')

    ctx.body = 'Hello Koa 2'
})

app.listen(3000)