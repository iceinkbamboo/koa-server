// 引入sql
let { getScore } =  require("../sql/score.js")

// 子路由
const Router = require('koa-router')
let router = new Router()

// router.post('/login', async ( ctx )=>{
//   let response = {}
//   let username = ctx.request.body.username
//   let password = ctx.request.body.password
//   let data = await login(username, password)
//   if (data.length != 0) {
//     response.stat = 1
//     response.data = data[0]
//   } else {
//     response.stat = 0
//     response.msg = '用户名或密码错误'
//   }
//   ctx.body = response
// })

router.get('/getScore', async (ctx) => {
    let response = {}
    let data = await getScore()
    response.data = data
    ctx.body = response
})

module.exports = router