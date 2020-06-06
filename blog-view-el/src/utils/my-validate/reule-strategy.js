// 验证规则策略类
module.exports = ruleStrategy = {
    required(data, msg) {
        const isRight = data !== ""
        return {
            msg,
            isRight,
        }
    },
    max_length(data, msg, maxLength) {
        const isRight = data.length <= maxLength
        msg = repTemplateSStr(msg, maxLength)
        return {
            msg,
            isRight,
        }
    },
    min_length(data, msg, minLength) {
        const isRight = data.length >= minLength
        msg = repTemplateSStr(msg, minLength)
        return {
            msg,
            isRight,
        }
    },
    // 不包含特殊字符
    not_special(data, msg) {
        const sepcialRex = /[#$@/\\()<>{}[\] ]/gi
        const s = data.match(sepcialRex)
        msg = s && repTemplateSStr(msg, s.toString())
        const isRight = !sepcialRex.test(data)
        return {
            msg,
            isRight,
        }
    }
}

/**
 * 把 param 的值赋值给 模板字符串 s%
 * 把 param 的值替换成 字符串模板
 * @param {*string} msg 错误提示信息
 * @param {*string|number} param 参数 
 * @return {*string} msg
 */
function repTemplateSStr(msg, param) {
    if (!~msg.indexOf("s%")) return msg
    return msg.replace(/s%/g, param)
}