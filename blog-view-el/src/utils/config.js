const pathName = {
    INDEX: "index",
    HOME: "home",
    USER: "user",
    LOGIN: "login",
    LABEL: "label",
    CLASS: "class",
    ARCHIVE: "archive",
    ABOUT: "about",
    MYHOME: "myhome",
    MY: "my",
}

let baseUrlStatic;
let baseUrlApi;

if (process.env.NODE_ENV === "development") {
    baseUrlApi = "http://192.168.2.102:8081/api" 
    // baseUrlStatic  = `${ process.env.BASE_URL }static/`
    baseUrlStatic  = `/static`
}
if (process.env.NODE_ENV === "production") {
    baseUrlApi = "http://localhost:8000/api/"
    baseUrlStatic  = `/static`
}

module.exports = {
    pathName,
    baseUrlStatic,
    baseUrlApi,
}