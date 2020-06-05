setInterval(() => {

}, 10000);

const ruleStrategy = {
    required(data) {
        return data !== ""
    },
    max_length(data, maxLength) {
        return data.length < maxLength
    },
    min_length(data, minLength) {
        return data.length > minLength
    }
}


function validate() {
    const args = Array.apply(null, arguments)
    if (({}).toString.call(args[0]) === "[object Object]") {

    }

    return this
}

validate.prototype.add = function() {
    const args = Array.apply(null, arguments)
    const result = singleValidator(args)
    this.cacheList ? this.cacheList.push(result) : this.cacheList = []
    
    return result
}

validate.prototype.every = function() {
    const cacheList = this.cacheList
    const countLen = cacheList.length
    let currLen = 0
    cacheList.forEach(item => {
        currLen += item.isRight
    })

    return {
        isRight: currLen === countLen,
        value: cacheList[0].value,
        msg: cacheList[0].msg,
        each: cacheList
    }
}

const validator = new validate() 
validator.add("zzh", [
    {
        rule: "required",
        msg: "用户名不能为空"
    },
    {
        rule: "min_length[2]",
        msg: "用户名长度不能小于s%"
    },
    function(data) {
        const isRight = data === "zzh" 
        return {
            isRight,
            msg: "用户名不等于zzh",
        }
    }
])
validator.add("123", [
    {
        rule: "required",
        msg: "密码不能为空"
    },
    {
        rule: "min_length[2]",
        msg: "密码长度不能小于s%"
    },
    function(data) {
        const isRight = data !== "123" 
        return {
            isRight,
            msg: "密码不等于123",
        }
    }
])
console.log(validator.every())
/**
 * 单次验证
 */
function singleValidator(args) {
    const [data, fields] = args
    const errArr = []

    const allArr = fields.map((item, index) => {
        if (typeof item === "function") {
            return item(data)
        }

        let { rule, msg } = item
        let isRight;
    
        // 获取 【】 中的值
        rule = findBracketInData(rule)
        if (({}).toString.call(rule) === "[object Array]") {
            // rule有参数时的处理
            const [_rule, param] = rule
            isRight = ruleStrategy[_rule](data, param)
    
            // 把 param 的值赋值给 模板字符串 s%
            msg = repTemplateStr(msg, param)
        } else {
            // rule没参数时的处理
            isRight = ruleStrategy[rule](data)
        }
        
        const result = {
            msg,
            isRight,
        }

        isRight || errArr.push(result)

        return result
    })

    if (errArr.length === 0) {
        return {
            value: data,
            isRight: true,
        }
    } else {
        return {
            value: data,
            msg: errArr[0].msg,
            isRight: evenyIsRight(allArr),
            each: errArr,
        }
    }
}

/**
 * 把 param 的值替换成 字符串模板
 * @param {*string} msg 错误提示信息
 * @param {*string|number} param 参数 
 * @return {*string} msg
 */
function repTemplateStr(msg, param) {
    if (!~msg.indexOf("s%")) return msg
    return msg.replace(/s%/g, param)
}

/**
 * 获取 rule [] 中的参数
 * @param {*} rule 
 */
function findBracketInData(rule) {
    const firBraInd = rule.indexOf("[")
    if (!~firBraInd) return rule
    const lasBraInd = rule.indexOf("]")
    const name = rule.slice(0, firBraInd)
    const param = rule.slice(firBraInd + 1, lasBraInd)

    return [name, param]
}

/**
 * 数组中的 isRight 是否全对
 * @param {*} arr 
 */
function evenyIsRight(arr, callback) {
    const countLen = arr.length
    let currLen = 0
    arr.forEach(item => {
        currLen += item.isRight
        callback && callback(item.isRight)
    })
    return countLen === currLen
}