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

const timestampFormat = function(timestamp, format) {
    timestamp = new Date(timestamp);
    const map = {
        // "y+": timestamp.getFullYear(),
        "M+": timestamp.getMonth() + 1,
        "d+": timestamp.getDate(),
        "h+": timestamp.getHours(),
        "m+": timestamp.getMinutes(),
        "s+": timestamp.getSeconds(),
    };
    const fill = time => (time < 10 && `0${time}`) || time;

    if (/(y+)/.test(format)) {
        format = format.replace(
            RegExp.$1,
            (timestamp.getFullYear() + "").slice(4 - RegExp.$1.length)
        );
    };

    for (const reg in map) {
        const regexp = new RegExp(`(${reg})`);
        if (regexp.test(format)) {
            format = format.replace(RegExp.$1, fill(map[reg]))
        };
    };
    return format;
}

Vue.filter("spliceNimietyWords", spliceNimietyWords)
Vue.filter("timestampFormat", timestampFormat)
