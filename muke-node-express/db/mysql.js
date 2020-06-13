
const mysql = require("mysql")
const { MYSQL_CONFIG } = require("../config/db");
let con

function connect() {
    con = mysql.createConnection(MYSQL_CONFIG)
    con.connect()
    con.on("error", handleError)
}

function handleError(err) {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            connect()
        } else {
            console.error(err.stack || err);
        }
    }
}

connect()

/**
 * 执行 sql 语句的函数
 * @param {*string} sql sql语句
 */
function exec(sql) {
    const promise = new Promise((resove, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                console.error(err)
                return
            }
            resove(result)
            // console.log(result)
        })
    })

    return promise
}

module.exports = {
    exec,
}