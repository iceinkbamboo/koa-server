const mysql = require('mysql')
// 本地服务器
const pool = mysql.createPool({
  host     :  '127.0.0.1',
  port     :  '3306',
  user     :  'root',
  password :  '******',
  database :  'game'
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