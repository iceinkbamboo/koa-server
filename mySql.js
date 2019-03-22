const mysql = require('mysql')
// 本地服务器
const pool = mysql.createPool({
  host     :  'localhost',
  port     :  '3306',
  user     :  'root',
  password :  'zhsh217218',
  database :  'poetry'
})

// 新浪云服务器
// const pool = mysql.createPool({
//   host     :  'w.rdc.sae.sina.com.cn',
//   port     :  '3306',
//   user     :  '25zkn3l0y3',
//   password :  'x2ily1hz1k0m40z4l0zliw3k2iiij32l430l21kl',
//   database :  'app_poetry'
// })

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