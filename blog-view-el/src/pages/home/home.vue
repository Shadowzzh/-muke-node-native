<template>
    <div class="home">
        <div>
            efewrfewrf
        </div>
    </div>
</template>

<script>
import api from "@/utils/api"

export default {
    data() {
        return {
            articleList:[]
        }
    },
    methods: {
        async setGlobalArticle() {
            const articleRes = await api.getGlobalArticle()
            this.articleList = articleRes.data
        }
    },
}
</script>

<style lang="scss" scoped>

</style>