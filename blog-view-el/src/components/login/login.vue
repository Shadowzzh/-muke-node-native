<template>
    <div class="login--wrap">
        <div class="__login">
            <div class="login--inner">
                <div class="__main">
                    <transition name="trigger-signin">
                        <div class="signin-view" v-show="signInNode.isShow">
                            <div class="__title">
                                <p v-if="lang === 'cn'">登录</p>
                                <p v-if="lang === 'en'">LOGIN</p>
                            </div>
                            <div class="input--box">
                                <input name="username-signin" 
                                    v-model="signInNode.username" 
                                    maxlength="8"
                                    :placeholder="lang === 'cn' ? '用户名': 'USERNAME'" 
                                />
                            </div>
                            <div class="input--box" >
                                <input name="password-signin" 
                                    v-model="signInNode.passowrd" 
                                    :placeholder="lang === 'cn' ? '密码' : 'PASSWORD'" 
                                />
                            </div>
                            
                            <div class="forget--pass">
                                <span v-if="lang === 'cn'">忘记密码 ?</span>
                                <span v-if="lang === 'en'">FORGOT YOUR PASSWORD</span>
                            </div>
                        </div>
                    </transition>

                    <transition name="trigger-register">
                        <div class="register-view" v-show="registerNode.isShow">
                            <div class="__title">
                                <p v-if="lang === 'cn'">注册</p>
                                <p v-if="lang === 'en'">REGISTER</p>
                            </div>
                            <div class="input--box" >
                                <input name="username-register" 
                                    v-model="registerNode.username" 
                                    :placeholder="lang === 'cn' ? '用户名': 'USERNAME'" 
                                />
                            </div>
                            <div class="input--box" >
                                <input name="password-register"  
                                    v-model="registerNode.passowrd" 
                                    :placeholder="lang === 'cn' ? '密码' : 'PASSWORD'" 
                                />
                            </div>
                            <div class="input--box">
                                <input name="repeat-password" 
                                    v-model="registerNode.repeatPass" 
                                    :placeholder="lang === 'cn' ? '确认密码' : 'REPEATPASSWORD'" 
                                />
                            </div>
                        </div>
                    </transition>
                </div>
            </div>

            <div class="__buttons">

                <button type="submit" :class="['__register', registerNode.isShow ? 'show': 'close']" 
                    :style="registerNode.style" 
                    @click="onClickRegister"
                >
                    <span v-if="lang === 'cn'">注册</span>
                    <span v-if="lang === 'en'">REGISTER</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i v-show="!registerNode.isShow" class="el-icon-arrow-right"></i>
                </button>
                
                <button type="submit" :class="['sign--in', signInNode.isShow ? 'show': 'close']"
                    :style="signInNode.style" 
                    @click="onClickSignIn"
                >
                    <i v-show="!signInNode.isShow" class="el-icon-arrow-left"></i>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span v-if="lang === 'cn'">登录</span>
                    <span v-if="lang === 'en'">SIGN IN</span>
                </button>
                
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/utils/api"
const validate = require('@/utils/my-validate/index')

const { debounce } = require("@/utils/tools")

export default {
    props: {
        lang: {
            type: String,
            default: "cn"
        },
    },
    data() {
        return {
            registerNode: {
                username: "",
                passowrd: "",
                repeatPass: "",

            },
            signInNode: {
                isShow: true,
                username: "",
                passowrd: "",
            }
        }
    },
    created() {
    },
    methods: {
        /**
         * 点击注册按钮
         */
        onClickRegister(e) {
            if (this.registerNode.isShow) {
                this.onRegister(e)
            } else {
                this.showRegister()
            }
        },
        /**
         * 显示注册按钮
         */
        showRegister() {
            this.registerNode.isShow = true
            this.signInNode.isShow = false
        },
        /**
         * 验证注册
         */
        checkRegister(callback) {
            const rules = require('./validate-rules')
            const { passowrd, username, repeatPass} = this.registerNode
            rules.repeatPassword.push(function(repeatPass) {
                return {
                    isRight: repeatPass === passowrd,
                    msg: "两次密码不一致"
                }
            })
            const validator = rules.checkUserPass(username, passowrd)
            validator.add(repeatPass, rules.repeatPassword)
            validator.every(res => {
                if(res) {
                    this.$message.error(res.msg)
                } else {
                    callback(username, passowrd)
                }
            })
            rules.repeatPassword.pop()
        },
        /**
         * 注册
         */
        onRegister(e) {
            const register = debounce(async (username, passowrd) => {
                // 注册 api
                const registerRes = await api.register(username, passowrd)
                if (registerRes.errno) {
                    this.$message.error(registerRes.message)
                } else {
                    this.$message.success("注册成功")
                    this.showSignIn()
                }
            }, 500)

            function self(e) {
                this.checkRegister(register)
            }

            this.onRegister = self
            return self.call(this, e)
        },

        /**
         * 点击登录按钮
         */
        onClickSignIn(e) {
            if (this.signInNode.isShow) {
                this.onLoginSubmit(e)
            } else {
                this.showSignIn()
            }
        },
        /**
         * 显示登录按钮
         */
        showSignIn() {
            this.registerNode.isShow = false
            this.signInNode.isShow = true
        },

        /**
         * 验证登录是否通过
         * @param {*callback} 登录后触发的回调函数
         */
        checkLogin(callback) {
            const rules = require('./validate-rules')
            const { passowrd, username } = this.signInNode
            const validator = rules.checkUserPass(username, passowrd)
            validator.every(res => {
                if(res) {
                    this.$message.error(res.msg)
                } else {
                    callback(username, passowrd)
                }
            })
        },
        /**
         * 登录
         */
        onLoginSubmit(e) {
            const login = debounce(async (username, passowrd) => {
                const loginRes = await api.login(username, passowrd)
                if (loginRes.errno) {
                    this.$message.error(loginRes.message)
                } else {
                    this.$message.success(loginRes.message)
                    this.$emit("before-login")
                }
            }, 500)

            function self(e) {
                this.checkLogin(login)
            }

            this.onLoginSubmit = self
            return self.call(this, e)
        }
    }
};
</script>

<style lang="scss" scoped>
.login--wrap {
    // 宽度是高度的 1.5 倍
    $height: 30rem;
    height: $height;
    width: ceil($height * 1.5);

    background-color: #ffffff;

    box-shadow: 0 0 20px 0px rgba($color: #000000, $alpha: 0.05);
    border-radius: 5px;
    overflow: hidden;

    margin: auto;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    $main-color: #7f7f7f;
    .__login {
        width: 100%;
        height: 100%;
        position: relative;
        color: $main-color;

        .forget--pass {
            margin-top: 2rem;
            font-size: 1.3rem;
            text-align: center;
            span {
                cursor: pointer;
            }
            &:hover {
                text-decoration: underline;
            }
        }
    }
    .login--inner {
        width: 100%;
        height: 100%;
        $sapce-padding: 3rem;
        padding: $sapce-padding;
        padding-bottom: 0;
        font-size: 2rem;
        box-sizing: border-box;
        .__main {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            &>div {
                width: 100%;
                position: absolute;
            }
            .signin-view {
                .input--box {
                    margin-top: 1.5rem;
                }
            }
            .register-view {
                .input--box {
                    margin-bottom: .5rem;
                }
            }
        }

        .__title {
            margin-bottom: 1rem;
        }

        .input--box {
            &:not(:last-child) {
                margin-bottom: 0.7rem;
            }
            input {
                color: $main-color;
                font-size: 1.4rem;
                padding: 1rem 0;
                border: 0;
                width: 100%;
                outline: medium !important;
            }
            border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
        }

        $trigger-speed: transform .25s ease-out, opacity .15s ease-out;
        .trigger-register-enter-active {
            transition:  $trigger-speed;
        }
        .trigger-register-leave-active {
            transition:  $trigger-speed;
        }
        .trigger-register-enter, .trigger-register-leave-to
            /* .trigger-register-leave-active for below version 2.1.8 */ {
            transform: translateX(-2rem);
            opacity: 0;
        }

        .trigger-signin-enter-active {
            transition:  $trigger-speed;
        }
        .trigger-signin-leave-active {
            transition:  $trigger-speed;
        }
        .trigger-signin-enter, .trigger-signin-leave-to
            /* .trigger-register-leave-active for below version 2.1.8 */ {
            transform: translateX(2rem);
            opacity: 0;
        }
    }
    // 控制按钮
    .__buttons {
        width: 100%;
        height: ceil($height * 0.16);
        display: flex;

        position: absolute;
        bottom: 0;
        font-size: 1.3rem;
        line-height: ceil($height * 0.16);
        & > button {
            border: 0;
            border-radius: 0.2rem;
            cursor: pointer;
            outline: none;
            transition: all 0.3s ease-out;
            text-align: center;
            &.show {
                width: 70%;
            }
            &.close {
                width: 30%;
            }
        }
        $sapce-margin: 1.5rem;
        .__register {
            color: $main-color;
            background-color: #e9eaed !important;
        }
        .sign--in {
            background-color: #293854 !important;
            color: #c1c6ce;
        }
    }
}
</style>