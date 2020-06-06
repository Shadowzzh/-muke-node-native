

// 单次验证
const singleValidator = require("./validate")


function validate() {
    const args = Array.apply(null, arguments)
    if (({}).toString.call(args[0]) === "[object Object]") {

    }

    return this
}

validate.prototype.add = function() {
    const args = Array.apply(null, arguments)
    const result = singleValidator(args)
    this.cacheList || (this.cacheList = [])
    this.cacheList.push(result)
    
    return result
}

validate.prototype.every = function(callback) {
    const cacheList = this.cacheList
    const errArr = []
    const countLen = cacheList.length
    let currLen = 0
    cacheList.forEach(item => {
        let isRight = item ? item.isRight: true
        currLen += isRight
        if (!isRight) {
            errArr.push(...item.each)
        }
    })

    const isRight = currLen === countLen
    if (isRight) {
        callback() 
    } else {
        callback({
            isRight: currLen === countLen,
            value: errArr[0].value,
            msg: errArr[0].msg,
            each: errArr
        })
    }
}

module.exports = validate