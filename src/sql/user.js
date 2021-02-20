const { query } = require('../mySql')
async function register(username, password) {
    let sql = `insert into user(id, username, password) values (uuid(),  '${username}', '${password}')`
    let data = await query(sql)
    return data
}
async function getName(username) {
    let sql = `select * from user where username = '${username}'`
    let data = await query(sql).catch(err => {
        console.log('err', err)
    })
    console.log('sql结果', data)
    return data
}

module.exports = { getName, register }