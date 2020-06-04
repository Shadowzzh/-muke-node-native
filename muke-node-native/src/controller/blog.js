/*
 * @Author: your name
 * @Date: 2020-05-27 08:12:41
 * @LastEditTime: 2020-05-28 17:11:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \muke-node-native\src\controller\blog.js
 */
const { exec } = require("../db/mysql");

/**
 * 返回文章列表
 * @param {*} author 作者 
 * @param {*} keyword  关键字
 */
function getList(author, keyword) {
    author = escape(author)
    keyword = escape(keyword)

    let sql = ["select * from blogs where 1=1"]
    if (author) {
        sql.push(` and author='${author}'`)
    }
    if (keyword) {
        sql.push(` and title like '%${keyword}%'`)
    }
    sql.push(` order by createtime desc;`)
    sql = sql.join("")
    return exec(sql)
}

/**
 * 获取文章详情
 * @param {*number} id 文章id
 */
function getDetail(id) {
    id = escape(id)
    const sql = `select * from blogs where id=${id}`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

/**
 * 添加一篇文章
 * @param {*string} title 文章名称
 * @param {*string} author 作者
 * @param {*string} content 内容
 */
function newBlog(blogData = {}) {
    let { title, author, content } = blogData
    title = escape(title)
    author = escape(author)
    content = escape(content)
    const createtime = Date.now()

    const sql = `
        insert into blogs (title, content, createtime, author) values
        ('${title}', '${content}', '${createtime}', '${author}')`


    return exec(sql).then(insertData => {
        console.log("insertData is ", insertData)
        return {
            id: insertData.insertId
        }
    })
}
        
/**
 * 更新一篇文章
 * @param {*number} id 文章id 
 * @param {*string} content 内容
 * @param {*string} title 文章名称
 */
function updateBlog(id, blogData = {}) {
    id = escape(id)
    // id 就是要更新博客的 id
    // blogData 是一个博客对象， 包含 title content 属性

    const loginCheckResult = loginCheck()
    if (loginCheckResult) {
        return loginCheck
    }

    let { title, content } = blogData

    title = escape(title)
    content = escape(content)

    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id};`
    return exec(sql).then(updateData => {
        console.log("updateData is", updateData)
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

/**
 * 删除一篇文章
 * @param {*number} id 文章id
 */
function delBlog(id, author) {
    author = escape(author)
    id = escape(id)
    const loginCheckResult = loginCheck()
    if (loginCheckResult) {
        return loginCheck
    }

    const sql = `delete from blogs where id='${id}' and author='${author}'`
    return exec(sql).then(deleteData => {
        console.log("deleteData is", deleteData)
        if (deleteData.affectedRows > 0) {
            return true
        }
        return false
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
}