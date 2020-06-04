<template>
    <div class="login--wrap">
        <div class="__login">
            <div class="login--inner">
                <div class="__main">
                    <div class="__title">
                        <p v-if="lang === 'cn'">登录</p>
                        <p v-if="lang === 'en'">LOGIN</p>
                    </div>
                    <div class="input--box">
                        <input :placeholder="lang === 'cn' ? '用户名': 'USERNAME'" />
                    </div>
                    <div class="input--box">
                        <input :placeholder="lang === 'cn' ? '密码' : 'PASSWORD'" />
                    </div>
                </div>
            </div>

            <div class="forget--pass">
                <p v-if="lang === 'cn'">忘记密码 ?</p>
                <p v-if="lang === 'en'">FORGOT YOUR PASSWORD</p>
            </div>

            <div class="__buttons">
                <div class="__register">
                    <p v-if="lang === 'cn'">注册</p>
                    <p v-if="lang === 'en'">REGISTER</p>
                </div>
                <div class="sign--in">
                    <p v-if="lang === 'cn'">进入</p>
                    <p v-if="lang === 'en'">SIGN IN</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        lang: {
            type: String,
            default: "cn"
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

    position: absolute;
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
            text-align: center;
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
        }
    }
    .login--inner {
        $sapce-padding: 3rem;
        padding: $sapce-padding;
        padding-bottom: 0;
        font-size: 2rem;

        .__title {
            margin-bottom: 1.5rem;
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
                outline: medium !important;
            }
            border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
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
        & > div {
            flex: 50%;
            border-radius: 0.2rem;
            cursor: pointer;
        }
        $sapce-margin: 1.5rem;
        .__register {
            background-color: #e9eaed;
            p {
                margin-left: $sapce-margin;
            }
        }
        .sign--in {
            background-color: #293854;
            color: #c1c6ce;
            p {
                text-align: right;
                margin-right: $sapce-margin;
            }
        }
    }
}
</style>