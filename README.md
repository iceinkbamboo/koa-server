# source

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

#run server
npm run start
```
# koa

```bash
#安装koa
npm install koa -S

#安装数据库插件
npm install mysql -s

#安装koa-router中间件
# koa2 对应的版本是 7.x
npm install --save koa-router@7

#安装koa2版本的koa-bodyparser@3中间件
#对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
npm install --save koa-bodyparser@3

#安装koa2-cors,设置请求跨域
npm install --save koa2-cors
```
#实例

```bash

#创建mySql.js
#引入const mysql = require('mysql')，连接数据库
#声明query函数进行数据库操作
const mysql = require('mysql')
const pool = mysql.createPool({
  host     :  '127.0.0.1',
  port     :  '3306', // mysql默认值
  user     :  'root',
  password :  '*****',
  database :  'poetry'
})

let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = { query }

#创建server1.js——server...js
#搭建get/post服务
function server5() {
  console.log('开始')
  const Koa = require('koa')
  const Router = require('koa-router')
  const bodyParser = require('koa-bodyparser')
  const {query} = require('./mySql')
  const cors = require('koa2-cors')
  const app = new Koa()
  async function getUser() {
    let sql = 'select * from user'
    let data = await query(sql)
    return data
  }
  async function postUser(username) {
    let sql = "select * from user where username = '" + username + "'"
    let data = await query(sql)
    console.log(data)
    return data
  }
  let home = new Router()
  // 子路由
  home.get('/user', async ( ctx )=>{
    let data = await getUser()
    ctx.body = data[0]
  })
  home.post('/getUser', async (ctx) => {
    console.log(ctx.request.body)
    let username = ctx.request.body.username
    let data = await postUser(username)
    ctx.body = data[0]
  })

  // 装载所有子路由
  let router = new Router()
  router.use('/poetry', home.routes(), home.allowedMethods())

  // 加载路由中间件
  app.use(cors())
  app.use(bodyParser())
  app.use(router.routes()).use(router.allowedMethods())
  app.listen(3000, () => {
    console.log('server is starting at port 3000')
  })
}

module.exports = server5

#创建server.js
#服务入口文件，引入服务
const server  = require('./server5.js')
server()

#启用服务
#在package.json中设置
#scripts": {
#  "server": "node server.js"
#}
#使用下面命令开启
npm run server