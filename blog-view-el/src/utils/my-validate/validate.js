// 验证规则策略类
const ruleStrategy = require("./reule-strategy")

/**
 * 单次验证
 */
module.exports = function singleValidator(args) {
    const errArr = []
    const [data] = args
    const allArr = validatorItemEachRule(args)

    // 数据是否通过全部验证 没通过的  push到 errorArray
    const isRight = evenyIsRight(allArr, item => {
        if (!item.isRight) {
            errArr.push(item)
        }
    })

    if (isRight) {
        return 
    } else {
        return {
            value: data,
            msg: errArr[0].msg,
            isRight,
            each: errArr,
        }
    }
}

/**
 * 验证 单个数据的 多个规则
 */
function validatorItemEachRule(args) {
    const [data, fields] = args
    const allArr = fields.map((item, index) => {
        // 自定义 验证
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
            rule = ruleStrategy[_rule](data, msg, param)
        } else {
            // rule没参数时的处理
            rule = ruleStrategy[rule](data, msg)
        }
        
        isRight = rule.isRight
        msg = rule.msg

        const result = {
            msg,
            isRight,
            value: data,
        }

        return result
    })

    return allArr 
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
        callback && callback(item)
    })
    return countLen === currLen
}