const validate  = require("./index")
setInterval(() => {
    
}, 100000);
const validator = new validate()
validator.add("", [
    {
        rule: "required",
        msg: "用户名不能为空"
    },
    {
        rule: "min_length[3]",
        msg: "用户名长度不能小于s%"
    },
    function (data) {
        const isRight = data === "zzh"
        return {
            isRight,
            msg: "用户名不等于zzh",
        }
    }
])
validator.add("{}", [
    {
        rule: "required",
        msg: "密码不能为空"
    },
    {
        rule: "min_length[3]",
        msg: "密码长度不能小于s%"
    },
    {
        rule: "max_length[14]",
        msg: "密码长度不能大于s%"
    },
    {
        rule: "not_special",
        msg: "密码不能包含特殊字符s%"
    },
])

validator.every(res => {
    console.log(res)
})