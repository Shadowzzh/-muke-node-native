/*
 * @Author: your name
 * @Date: 2020-05-28 11:09:42
 * @LastEditTime: 2020-05-28 12:15:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \muke-node-native\src\db\mysql.js
 */ 
const mysql = require("mysql")
const { MYSQL_CONFIG }  = require("../config/db");
const con = mysql.createConnection(MYSQL_CONFIG)
con.connect()

/**
 * 执行 sql 语句的函数
 * @param {*string} sql sql语句
 */
function exec(sql) {
    const promise = new Promise((resove ,reject) => {
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