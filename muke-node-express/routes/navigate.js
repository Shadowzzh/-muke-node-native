
const { SuccessModel, ErrorModel } = require("../model/resModel.js")
const { getNavigateName } = require("../controller/navigate.js")
const { findUser } = require("../controller/user.js")
const { deUserId } = require("../utils/cryp")

const express = require('express');
const router = express.Router()

router.get("/getNavigateName", function (req, res, next) {
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
            res.json(new SuccessModel(navList))
        } else {
            res.json(new ErrorModel("没找到该用户"))
        }
    })
})

module.exports = router
