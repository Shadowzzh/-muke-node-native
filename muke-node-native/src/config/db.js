/*
 * @Author: your name
 * @Date: 2020-05-28 10:44:26
 * @LastEditTime: 2020-05-28 11:08:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \muke-node-native\src\config\db.js
 */ 
const env = process.env.NODE_ENV

// 配置
let MYSQL_CONFIG;
let REDIS_CONFIG;

if (env === "dev") {
    // mysql
    MYSQL_CONFIG = {
        host: "127.0.0.1",
        user: "root",
        password: "opacity0712.",
        port: 3306,
        database: "node-blog-muke",
    }

    // redis
    REDIS_CONFIG = {
        port: 6379,
        host: "127.0.0.1",
    }
}

if (env === "production") {
    // mysql
    MYSQL_CONFIG = {
        host: "127.0.0.1",
        user: "root",
        password: "opacity0712.",
        port: 3306,
        database: "node-blog-muke",
    }
    
    // redis
    REDIS_CONFIG = {
        port: 6379,
        host: "127.0.0.1",
    }
}

module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG,
}
