
const { pathName } = require('@/utils/config')

module.exports = {
    home: { label: "首页", icon: "\ue601", name: pathName.HOME },
    user: { label: "用户", icon: "\ue600", name: pathName.USER },
    login: { label: "登录", icon: "\ue6f0", name: pathName.LOGIN },
    label: { label: "标签", icon: "\ue62b", name: pathName.LABEL },
    class: { label: "分类", icon: "\ue610", name: pathName.CLASS },
    archive: { label: "归档", icon: "\ue7aa", name: pathName.ARCHIVE},
    about: { label: "关于", icon: "\ue659", name: pathName.ABOUT },
    myhome: { label: "我的主页", icon: "\ue614", name: pathName.MYHOME },
    my: { label: "我的", icon: "\ue625", name: pathName.MY },
}