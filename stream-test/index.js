const fs = require("fs")
const path = require("path")

const fileName = path.resolve(__dirname, "dat                                                             a.txt")
const fileName1 = path.resolve(__dirname, "data1.txt")

// 读取文件的 stream 对象
const readStream = fs.createReadStream(fileName)

// 写入文件的 stream 对象
const writeStream = fs.createWriteStream(fileName1)

readStream.pipe(writeStream)

readStream.on("end", () => {
    console.log("拷贝完成")
})