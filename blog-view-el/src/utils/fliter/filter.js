import Vue from 'vue'

/**
 * 
 * @param {string} str 根据这个字符串做处理
 * @param {number} maxWords 最大字数
 * 
 * @param {obj} format 格式 
 * @param {string} replaceStr 代替删除的字符串 
 * @param {number} count  需要重复的次数 
 */
const spliceNimietyWords = (str, maxWords = 12, format = "...") => {

    if (!str) return;

    const request = str.slice(0, maxWords);

    return request.length < maxWords ?
        request : request + format
}

Vue.filter("spliceNimietyWords", spliceNimietyWords)
