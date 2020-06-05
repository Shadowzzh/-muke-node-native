import $http from "./http"

export default {
    login(username, passowrd) {
        console.log(username)
        $http.post("user/login", {
            username,
            passowrd
        }).then(res => {
            console.log(res)
        })
    }
}