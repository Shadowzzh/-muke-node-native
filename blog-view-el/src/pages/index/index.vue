<template>
    <div class="index">
        <header class="header">
            <div class="header-inner public-inner">
                <div class="user-icon" draggable="true">
                    {{ nickname || "" }}
                </div>
                <nav class="nav">
                    <div :class="['nav-tab', item.name === nav.selected ? 'selected' : '']" 
                        draggable="true"
                        v-for="(item, index) in nav.list"
                        :key="index"
                        @click="onTapTab(item.name)"
                    >
                        <span>
                            <i class="iconfont">{{ item.icon }}</i>
                            {{ item.label }}
                        </span>
                    </div>
                </nav>
            </div>
        </header>

        <main class="main">
            <div class="main-inner public-inner">
                <router-view 
                    @setSelectedNav="setSelectedNav"
                    @setShowUserName="setShowUserName"
                    @setNavigateTab="setNavigateTab"
                ></router-view>
            </div>
        </main>

        <footer class="footer">
            <div class="footer-inner public-inner">
                <div>
                    <span>&copy;&nbsp;2020</span>
                    <span v-if="nickname">
                        <i class="iconfont">&#xe625;</i>
                        {{ nickname }}
                    </span>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import { pathName } from '@/utils/config'
import api from "@/utils/api"

export default {
    components: {
    },
    data() {
        return {
            nickname: "",
            loginShow: true,
            nav: {
                selected: "",
                list: []
            },
        }
    },
    created() {
        this.setNavigateTab()
        this.setShowUserName()
        this.nav.selected = this.$router.history.current.name
        console.log(this.nav.selected)
    },
    methods: {
        /**
         *  点击选项卡
         *  @param {string} name 路径名称
         */
        onTapTab(name) {
            this.$navigate.goToName(this, name)
            this.setSelectedNav(name)
            if (name === pathName.MYHOME) {
                sessionStorage.clear("curr-user-info")
                history.go(0)
            }
        },
        /**
         * 设置选中的选项卡
         */
        setSelectedNav(name) {
            const slashInd = name.indexOf("/")
            // console.log(name)
            if (!!~slashInd ) {
                name = name.slice(0, slashInd)
            }
            this.nav.selected = name
        },
        /**
         *  设置导航选项卡
         */
        async setNavigateTab(otherId) {
            // if session保存着其他用户信息
            if (this.$getUserInfo().userId) {
                otherId = this.$getUserInfo().userId
            } 
            const navRes = await api.getNavigateName(otherId)
            const map = require("./router")
            const nav = navRes.data.map(name => {
                return map[name]
            })
            this.nav.list = nav
        },
        /**
         * 设置用户名
         */
        async setShowUserName(userName) {
            // 手动传入
            if (userName) {
                this.nickname = userName
                return 
            } 

            // if session保存着其他用户信息
            userName = this.$getUserInfo().userName
            if (userName) {
                this.nickname = userName
                return 
            } 

            // 从服务器获取自己的用户id
            const userDetailRes = await api.getUserDetail()
            this.nickname = userDetailRes.data.username
        },
        /**
         *  显示登录组件
         */
        showLoginCom() {
            
        }
    },
};
</script>

<style lang="scss" scoped>
    @import url("../../assets/iconfont/al/iconfont.css");

    .index {
        $bar-background-color: #f5f5f5;
        position: relative;
        min-height: 100vh;
        .public-inner {
            margin: 0 auto;
            width: 80rem;
        }

        .header {
            background-color: $bar-background-color;
            .header-inner {
                padding: 2.5rem 2rem;

                display: flex;
                justify-content: space-between;
                align-items: center;
                
                .user-icon {
                    font-size: 2.2rem;
                    font-weight: 500;
                    cursor: pointer;
                }

                .nav {
                    display: flex;
                    color: #666;
                    font-size: 1.4rem;
                    .nav-tab.selected {
                        background-color: #E1E1E1;
                    }
                    .nav-tab {
                        display: flex;
                        cursor: pointer;
                        border-radius: .2rem;

                        transition: background-color .15s ease-out;
                        &:hover {
                            background-color: #E1E1E1;
                        }
                        span {
                            display: block;
                            padding: 0 1rem;
                            display: flex;
                            align-items: center;
                            .iconfont {
                                font-size: 1.2rem;
                                margin-right: 1rem;
                            }
                        }
                    }
                }
            }
        }

        .main {
            padding-bottom: 15rem;;
            .main-inner {
                margin-top: 8rem;
            }
        }

        .footer {
            width: 100%;
            position: absolute;
            bottom: 0;
            background-color: $bar-background-color;
            min-height: 5rem;
            padding: 1rem 0;
            .footer-inner {
                line-height: 2;
                color: #666;
                font-size: 1.3rem;
                .iconfont {
                    margin: 0 1rem;
                }
                &>div, &>div>span {
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
</style>