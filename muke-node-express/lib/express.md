# express中间件原理

## register

@param {string} path 路径

用来用来（格式化）|（适配）传入的参数，拆分成一个对象（info)

Info
1. path路径 用来被路由命中
2. stack回调函数列表 中间件  next(res, req, next)

## use get post
register函数的外套 用来把 register 返回的info对象注册到各个(use[],get[]...)routes列表中

## match
1. 用req的url 命中 info中的url
2. 获取 use & url命中的路由 注册的所有 info的stack
3. 返回命中的url的info列表stack

## handle
核心处理方法</br>
相当于一个链表结构</br>
拿到match返回的stack列表</br>
shift stack(req, res, next)</br>
这个next函数拥有 handle函数的参数闭包 所以可以使用 stack 变量</br>





