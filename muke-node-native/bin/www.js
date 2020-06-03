/*
 * @Author: your name
 * @Date: 2020-05-26 16:28:46
 * @LastEditTime: 2020-05-26 16:37:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \muke\bin\www.js
 */ 

 const http = require("http")

 const serverHandle = require("../app")
 const PORT = 8000


 const server = http.createServer(serverHandle) 

 server.listen(PORT)
