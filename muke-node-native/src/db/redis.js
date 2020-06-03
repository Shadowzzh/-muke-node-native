const redis = require("redis")
const { REDIS_CONFIG } = require("../config/db");
// 创建客户端
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)

redisClient.on("error", err => {
    console.error(err)
})

/**
 * 设置 redis 的值
 * @param {*string} key 键
 * @param {*any} value 值
 */
function set(key, val) {
    console.log(key)
    if (typeof val === "object") {
        val = JSON.stringify(val)
    }
    try {
        redisClient.set(key, val, redis.print)
    } catch (error) {
        console.error(error)
    }
}

/**
 * redis 通过键获取对应值
 * @param {*} key 
 */
function get(key) {
    const promise =  new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {

            if (err) {
                reject(err)
                return 
            }

            if (val == null) {
                resolve(null)
                return 
            }

            try {
                resolve(JSON.parse(val))
            } catch (error) {
                resolve(val)
            }

        })

        // redisClient.quit()
    })

    return promise
}

module.exports = {
    set,
    get,
}