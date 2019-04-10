function server5() {
  console.log('开始')
  const Koa = require('koa')
  const Router = require('koa-router')
  const bodyParser = require('koa-bodyparser')
  const {query} = require('./mySql')
  const cors = require('koa2-cors')
  const app = new Koa()
  async function login(username, password) {
    let sql = "select * from user where username = '" + username + "' and password = '" + password + "'"
    let data = await query(sql)
    return data
  }
  async function getUser(username) {
    let sql = "select * from user where username = '" + username + "'"
    let data = await query(sql)
    console.log(data)
    return data
  }
  async function register(username, password) {
    let sql = "insert into user(userid, username, password) values (uuid(), '" + username + "', '" + password + "')"
    let data = await query(sql)
    return data
  }
  async function test() {
    let sql = 'select * from user'
    let data = await query(sql)
    return data
  }
  async function getExam(examid) {
    let sql = "select * from exam where examid = '" + examid + "'"
    let data = await query(sql)
    return data
  }
  let home = new Router()
  // 子路由
  home.post('/login', async ( ctx )=>{
    let response = {}
    let username = ctx.request.body.username
    let password = ctx.request.body.password
    let data = await login(username, password)
    if (data.length != 0) {
      response.stat = 1
      response.data = data[0]
    } else {
      response.stat = 0
      response.msg = '用户名或密码错误'
    }
    ctx.body = response
  })
  home.post('/getUser', async (ctx) => {
    let response = {}
    let username = ctx.request.body.username
    let data = await getUser(username)
    if (data.length != 0) {
      response.stat = 1
      response.data = data[0]
    } else {
      response.stat = 0
    }
    ctx.body = response
  })

  home.post('/register', async (ctx) => {
    let response = {}
    let username = ctx.request.body.username
    let password = ctx.request.body.password
    let data = await register(username, password)
    if (data.length != 0) {
      response.stat = 1
      response.data = data[0]
    } else {
      response.stat = 0
      response.msg = '注册失败'
    }
    ctx.body = response
  })

  home.get('/test', async (ctx) => {
    let response = {}
    let data = await test()
    if (data.length != 0) {
      response.data = data
    } else {
      response.msg = '接口调用失败'
      response.data = ctx
    }
    ctx.body = response
  })

  home.post('/getExam', async (ctx) => {
    let response = {}
    let examid = ctx.request.body.examid
    let data = await getExam(examid)
    if (data.length != 0) {
      response.stat = 1
      response.data = data[0]
    } else {
      response.stat = 0
      response.msg = '接口调用失败'
    }
    ctx.body = response
  })

  // 装载所有子路由
  let router = new Router()
  router.use('/poetry', home.routes(), home.allowedMethods())

  // 加载路由中间件
  app.use(cors())
  app.use(bodyParser())
  app.use(router.routes()).use(router.allowedMethods())
  app.listen(5050, () => {
    console.log('server is starting at port 5050')
  })
}

module.exports = server5