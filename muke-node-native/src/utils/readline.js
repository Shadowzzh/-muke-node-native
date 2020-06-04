const fs  = require("fs");
const path  = require("path");
const readline  = require("readline");

const fileName = path.join(".", "../", "muke-node-native", "logs", "access.log")
const readStream = fs.createReadStream(fileName)
const rl = readline.createInterface ({
    input: readStream
})

let sum = 0
const browserNum = {
    Chrome: 0,
    Firefox: 0,
    QQBrowser: 0,
    Edg: 0
}

// 运行读取
rl.on("line", (lineData) => {
    if (!lineData) {
        return
    }

    // 记录总行数
    sum ++

    const arr = lineData.split(" -- ")

    for (const browser in browserNum) {
        if (browserNum.hasOwnProperty(browser)) {
            if (arr[2] && arr[2].indexOf(browser) > 0 ) {
                browserNum[browser] ++
            }
        }
    }
})

rl.on("close", () => {
    for (const browser in browserNum) {
        const item = browserNum[browser]
        if (browserNum.hasOwnProperty(browser)) {
            console.log(`${browser} 占比: ${((item / sum) * 100).toFixed(2)}%`)
        }
    }
})