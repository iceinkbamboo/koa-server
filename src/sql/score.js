const { query } = require('../mySql')

async function getScore() {
    let sql = "select * from score"
    let data = await query(sql)
    return data
}

module.exports = { getScore }