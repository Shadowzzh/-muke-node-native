module.exports = {
    devServer: {
        port: 8081,     // 端口
        open: false, //是否自动弹出浏览器页面
        // host: "localhost",
        // port: '8081',
        https: false,   //是否使用https协议
        hotOnly: true, //是否开启热更新
        proxy: {
            '/api': {
                target: 'http://localhost:8000/api/', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': ''
                }
            }
        },
    },
    lintOnSave: false
}