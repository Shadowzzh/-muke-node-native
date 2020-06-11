<template>
    <div class="login">
        <!-- 中英文选项 -->
        <div class="lang-option">
            <el-dropdown size="small" trigger="click" @command="onChangeLang">
                <span class="el-dropdown-link">
                    {{ langShow[lang] }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        v-for="(item, index) in langOption[lang]"
                        :key="index"
                        :command="item.value"
                    >{{ item.label }}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <loginPanel :lang="lang" v-on:before-login="onGotoInexPage"></loginPanel>
    </div>
</template>

<script>
import loginPanel from "@/components/login/login.vue";
import { pathName } from '@/utils/config'


export default {
    components: {
        loginPanel
    },
    data() {
        return {
            lang: "cn",
            langShow: {
                en: "english",
                cn: "中文"
            },
            langOption: {
                
                cn: [{
                    label: "中文",
                    value: "cn"
                }, {
                    label: "英文",
                    value: "en"
                }],
                en: [{
                    label: "china",
                    value: "cn"
                }, {
                    label: "english",
                    value: "en"
                }]
            }
        }
    },
    methods: {
        /**
         *  改变 语言
         */
        onChangeLang(lang) {
            this.lang = lang
        },
        /**
         *  跳转到 首页
         */
        onGotoInexPage() {
            console.log("content.$router.history.current.name, historyObj.name")
            this.$navigate.goToName(this, pathName.INDEX)
        }
    },
};
</script>

<style lang="scss" scoped>
    .login {
        width: 100vw;
        height: 100vh;
        background: url($baseUrl + "/images/bg3.jpg") no-repeat;
        background-size: cover;
        background-position: center;

        .lang-option {
            color: #7f7f7f !important;
            cursor: pointer;
            position: absolute;
            right: 2rem;
            top: 2rem;
        }
    }
</style>