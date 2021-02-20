function server() {
  console.log('开始')
  const Koa = require('koa')
  const Router = require('koa-router')
  // const bodyParser = require('koa-bodyparser')
  const bodyParser = require('koa-body')
  const cors = require('koa2-cors')
  const app = new Koa()
  app.use(bodyParser({ multipart: true }))
  
  let { user, score } = require('./router/index')

  // 装载所有子路由
  let router = new Router()
  router.use('/user', user.routes(), user.allowedMethods())
  router.use('/score', score.routes(), score.allowedMethods())

  // 加载路由中间件
  app.use(cors())
  app.use(router.routes()).use(router.allowedMethods())
  app.listen(5050, () => {
    console.log('server is starting at port 5050')
  })
}

module.exports = server