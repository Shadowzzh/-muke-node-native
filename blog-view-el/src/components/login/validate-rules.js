const validate = require('@/utils/my-validate/index')

const passowrd = [
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
]

const username = [
    {
        rule: "required",
        msg: "用户名不能为空"
    },
    {
        rule: "min_length[3]",
        msg: "用户名长度不能小于s%"
    },
    {
        rule: "max_length[12]",
        msg: "用户名长度不能大于s%"
    },
    {
        rule: "not_special",
        msg: "用户名不能包含特殊字符v%"
    }
]

const repeatPassword = [
    {
        rule: "required",
        msg: "确认密码不能为空"
    },
    {
        rule: "min_length[3]",
        msg: "确认密码长度不能小于s%"
    },
    {
        rule: "max_length[12]",
        msg: "确认密码长度不能大于s%"
    },
    {
        rule: "not_special",
        msg: "确认密码不能包含特殊字符v%"
    }
]

function checkUserPass(_username, _passowrd) {
    const validator = new validate()
    validator.add(_username, username)
    validator.add(_passowrd, passowrd)
    return validator
}

module.exports = {
    username,
    passowrd,
    repeatPassword,
    checkUserPass,
}