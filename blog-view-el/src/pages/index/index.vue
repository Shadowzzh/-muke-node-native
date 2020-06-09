<template>
    <div class="index">
        <header class="header">
            <div class="header-inner public-inner">
                <div class="user-icon" draggable="true">
                    {{ nickname || "Next" }}
                </div>
                <nav class="nav">
                    <div class="nav-tab" 
                        draggable="true"
                        v-for="(item, index) in nav.list"
                        :data-name="item.name"
                        :key="index"
                    >
                        <span>
                            <i class="iconfont">{{ item.icon }}</i>
                            {{ item.label }}
                        </span>
                    </div>
                </nav>
            </div>
        </header>

        <main>
            <router-view></router-view>
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

        <!--<loginPanel />-->
    </div>
</template>

<script>
import loginPanel from "@/components/login/login.vue";
import api from "@/utils/api"

export default {
    components: {
        loginPanel
    },
    data() {
        return {
            nickname: "zzh",
            nav: {
                list: []
            },
        }
    },
    created() {
        this.setNavigateTab()
    },
    methods: {
        /**
         *  获取导航选项卡
         */
        async setNavigateTab(otherId) {
            const navRes = await api.getNavigateName(otherId)
            const map = require("./router")
            const nav = navRes.data.map(name => {
                return map[name]
            })
            this.nav.list = nav
        },


        onTapTab() {
            const map = {
                // home,
                // user,
                // login,
                // label,
                // class,
                // archive,
                // about,
                // myhome,
                // my,
            }
        }
    },
};
</script>

<style lang="scss" scope>
    @import url("../../assets/iconfont/al/iconfont.css");

    .index {
        $bar-background-color: #f5f5f5;
        position: relative;
        min-height: 100vh;
        .public-inner {
            width: 70rem;
            margin: 0 auto;
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

        .footer {
            width: 100vw;
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