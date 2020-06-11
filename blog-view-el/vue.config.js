
const { baseUrlStatic } = require("./src/utils/config")
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}


module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('static', resolve('src/static\/'))
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `$baseUrl: ${baseUrlStatic};`
            }
        }
    },
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
    lintOnSave: false,
}