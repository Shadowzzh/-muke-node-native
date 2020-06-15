const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs  = require("fs");
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')
const navigateRouter = require('./routes/navigate')

const session = require("express-session");
const RedisStore = require("connect-redis")(session);

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
const ENV = process.env.NODE_ENV
if (ENV !== "production") {
    // 开发环境 / 测试环境
    app.use(logger("dev"))
} else {
    const logFileName = path.join(__dirname, "logs", "access.log")
    const writeStream = fs.createWriteStream(logFileName, {
        flags: "a"
    })
    app.use(logger("combined", {
        stream: writeStream
    }))
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require("./db/redis")
const sessionStore = new RedisStore({
    client: redisClient
})
app.use(session({
    secret: "www.ZHANGZIHENG.top",
    cookie: {
        path: "/",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStore
}))

app.use('/api/user/', userRouter);
app.use('/api/blog/', blogRouter);
app.use('/api/navigate/', navigateRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.end('error');
});

module.exports = app;
