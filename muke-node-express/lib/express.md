# express中间件原理

## register
用来用来（格式化）（适配）传入的参数，拆分成一个对象（info)

两个参数 

1. path路径 用来被路由命中
2. stack回调函数列表 中间件（res, req, next)

## use get post
register函数的外套 用来把 register 返回的info对象传入各个routes列表中

## match
1. 获取 use & get | post... 注册的所有 info
2. 用req的url 命中 info中的url
3. 返回命中的url的info列表stack

## handle
核心处理方法

相当于一个链表结构

拿到match返回的stack列表

shift stack(req, res, next)

这个next函数拥有 handle函数的参数闭包 所以可以使用 stack变量





