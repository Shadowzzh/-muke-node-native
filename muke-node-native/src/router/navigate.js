
const { SuccessModel, ErrorModel } = require("../model/resModel.js")
const { set } = require("../db/redis");
const { getNavigateName } = require("../controller/navigate.js")
const { findUser } = require("../controller/user.js")
const { deUserId } = require("../utils/cryp");

function handleNavigateRouter(req, res) {
    const { method, url, path, query, body } = req

    // 获取导航栏
    if (method === "GET" && path === "/api/navigate/getNavigateName") {
        const { userId } = req.session
        let { otherId } = req.query

        return new Promise((resolve) => {
                if (otherId) {
                    otherId = deUserId(otherId)
                    findUser(otherId).then(data => {
                        if (data.id) {
                            resolve("other")
                        } else {
                            resolve()
                        }
                    })
                    return
                }

                if (!userId) {
                    resolve("visitor")
                } else {
                    findUser(userId).then(data => {
                        if (data.id) {
                            resolve("user")
                        } else {
                            resolve("visitor")
                        }
                    })
                }
        }).then((navName) => {
            if (navName) {
                const navList = getNavigateName(navName)
                return new SuccessModel(navList)
            } else {
                return new ErrorModel("没找到该用户")
            }
        })
    }

}

module.exports = handleNavigateRouter

