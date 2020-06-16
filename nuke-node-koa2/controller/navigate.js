const { exec } = require("../db/mysql");

function getNavigateName(userStatus) {
    const map = {
        visitor: [
            "home",
            "user",
            "login",
        ],
        user: [
            "home",
            "user",
            "label",
            "class",
            "archive",
            "about",
            "my",
        ],
        other: [
            "home",
            "user",
            "label",
            "class",
            "archive",
            "about",
            "myhome",
        ],
    }
    return map[userStatus]
}

module.exports = {
    getNavigateName
}