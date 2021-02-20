// 引入sql
let { getName, register } =  require("../sql/user.js")

// 子路由
const Router = require('koa-router')
let router = new Router()

router.post('/register', async ( ctx )=>{
  let response = {}
  let username = ctx.request.body.username
  let password = ctx.request.body.password
  let data = await register(username, password)
  if (data.length != 0) {
    response.stat = 1
    response.data = data[0]
  } else {
    response.stat = 0
    response.msg = '用户名或密码错误'
  }
  ctx.body = response
})

router.get('/getName', async (ctx) => {
    let username = ctx.query.username
    if (!username) {
      ctx.body = {
        data: 1,
        msg: 'username is not undefined'
      }
      return
    }
    let response = {}
    let data = await getName(username)
    if (data.length != 0) {
      response.data = data[0]
    } else {
      response.data = null
    }
    ctx.body = response
})

module.exports = router