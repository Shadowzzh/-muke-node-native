<template>
    <div class="user">
        <div class="user-panel">
            <div class="avatar">
                <img :src="deafultAvatarUrl" />
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/utils/api" 
const { baseImgUrl } = require("@/utils/config")
const deafultAvatarUrl = `${baseImgUrl}default-avatar.png`

export default {
    data() {
        return {
            deafultAvatarUrl,
            user: {
                list: []
            }
        }
    },
    created() {
        this.serUserList()
    },  
    methods: {
        async serUserList() {
            const userListRes = await api.getUserList()
            this.user.list = userListRes.data
        }
    }
}
</script>

<style lang="scss" scoped>

</style>