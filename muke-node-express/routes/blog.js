const express = require('express');
const router = express.Router()
const { getList, getDetail, newBlog, updateBlog, delBlog } = require("../controller/blog")
const { SuccessModel, ErrorModel } = require("../model/resModel.js")

/**
 * 获取博客列表
 */
router.get("/list", function (req, res, next) {
    let { user_id = "", keyword = "" } = req.query
    const result = getList({ userId: user_id, keyword })
    return result.then(listData => {
        res.json(new SuccessModel(listData))
    })
})


module.exports = router