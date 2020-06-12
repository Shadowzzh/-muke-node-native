<template>
    <div class="user">
        <div class="user-panel" 
            draggable="true"
            v-for="(item, index) in user.list" 
            :key="index"
            @click="onClickUserPanel(item.id, item.username)"
        >
            <div class="avatar">
                <img :src="`${$baseUrlStatic}/images/default-avatar.png`" />
            </div>
            <div class="main">
                <div class="user-name">
                    {{ item.username }}
                </div>
                <div class="signature">
                    {{ item.signature ? item.signature : "什么都没有写。"}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { pathName } from '@/utils/config'
import api from "@/utils/api" 

export default {
    data() {
        return {
            user: {
                list: []
            }
        }
    },
    created() {
        this.setUserList()
    },  
    methods: {
        /**
         * 设置用户列表
         */
        async setUserList() {
            const userListRes = await api.getUserList()
            this.user.list = userListRes.data
        },
        /**
         *  点击用户面板
         */
        onClickUserPanel(userId, username) {
            this.$emit("setSelectedNav", pathName.HOME)
            this.$emit("setShowUserName", username)
            this.$emit("setNavigateTab", userId)
            this.$navigate.goToPath(this, `${ pathName.HOME }/${userId}`)
        }
    }
}
</script>

<style lang="scss" scoped>
    .user {
        .user-panel {
            display: flex;
            align-items: center;
            padding: 1rem;
            background-color: #fcfcfc;
            border-radius: .5rem;
            cursor: pointer;
            transition: transform .3s ease-out,
                        box-shadow .15s ease-out;
            transform: translateX(0);
            &:hover {
                box-shadow: 0 0 .5rem .1rem #f8f8f8;
                transform: translateX(1rem);
            }

            &:not(:last-child) {
                margin-bottom: 2rem;
            }
            .avatar {
                $base-var: 6.6rem;
                border-radius: $base-var;
                overflow: hidden;
                margin-right: 2rem;
                img {
                    width: $base-var;
                    height: $base-var;
                }
            }
            .user-name {
                font-size: 1.4rem;
                color: #3b3b3b;
            }
            .signature {
                font-size: 1.2rem;
                color: #aaa;
            }
        }
    }
</style>