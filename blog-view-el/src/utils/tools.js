function timestampFormat(timestamp, format) {
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
};

/**
 * 节流
 * 使传入的回调函数 在delay时间内只能触发 一次
 * @param {function} callback 延时后需要执行的函数
 * @param {number} delay 延长时间
 */
function throttle(callback, delay = 100, method = "time") {
    // 过了 delay 秒后才能执行第一次 再延时
    const date = function () {
        let req;
        let prve = Date.now(); // 过去的

        return function (...args) {
            let now = Date.now(); // 现在的

            if (now - prve > delay) { // 现在 - 过去 > 延迟的时间
                req = callback.apply(this, args);
                prve = Date.now();
            };
            return req
        };
    };

    // 先执行第一次 再延时
    const time = function () {
        let isExecute = true; // 是否可执行

        return function (...args) {
            let req;
            if (!isExecute) return;

            req = callback.apply(this, args);
            isExecute = false;

            setTimeout(() => {
                isExecute = true; // delay 后可执行
            }, delay);
            return req
        };

    };

    let Methods = {
        date, time
    };

    return Methods[method]()
}

/**
 * 防抖
 * 使传入的函数 在delay后没有触发事件才会触发
 * @param {function} callback 延时后需要执行的函数
 * @param {number} delay 延长时间
 */
function debounce(callback, delay = 100) {
    let executeDelay = null;

    return function (...args) {
        if (executeDelay !== null) clearTimeout(executeDelay);

        executeDelay = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
}

module.exports = {
    throttle,
    debounce,
    timestampFormat,
}