<template>
    <div class="home">
        <div class="article" 
            v-for="(val, index) in article.list" 
            :key="index"
        >
            <div class="title">
                {{ val.title }}
            </div>
            <div class="rests">
                <div class="create-time">
                    <i class="iconfont">&#xe72d;</i>
                    <span>发表时间</span>
                    <time>{{ val.createtime | timestampFormat("yyyy-M-d") }}</time>
                </div>
                <div class="author">
                    <i class="iconfont">&#xe65c;</i>
                    <span>作者</span>
                    <div class="h-line">{{ val.author }}</div>
                </div>
            </div>
            <div class="content">
                {{ val.content | spliceNimietyWords(150) }}
            </div>
            <div v-if="val.content.length > 150" class="read-all">
                <span>阅读全文 »</span>
            </div>
        </div>

        <div class="empty" v-if="isEmpty">
            这家伙啥也没写 ~ ~
        </div>
    </div>
</template>

<script>
import api from "@/utils/api"

export default {
    data() {
        return {
            isEmpty: false,
            article: {
                list:[]
            }
        }
    },
    props: {

    },
    filters: {

    },
    created() {
        this.setArticle(this.$route.params.userId)
    },
    methods: {
        /**
         * 设置全部文章
         */
        async setArticle(userId) {
            const articleRes = await api.getArticle(userId)
            const list = articleRes.data
            this.article.list = list
            if (list.length === 0) {
                setTimeout(() => this.isEmpty = true, 0)
            }
        }
    },
}
</script>

<style lang="scss" scoped>
 @import url("../../assets/iconfont/al/iconfont.css");
    .home {
        .article {
            &:not(:first-child) {
                margin-top: 12rem;
            }
            .title {
                font-size: 2.6rem;
                font-weight: 400;
                margin: 2rem 0 1rem;
                color: #3b3b3b;
            }
            .rests {
                display: flex;
                font-size: 1.2rem;
                &>div {
                    display: flex;
                    align-items: center;
                    &:not(:last-child)::after {
                        content: "|";
                        margin: 0 .6rem;
                        display: inline;
                    }
                }
                .create-time, .author {
                    color: #999;
                    margin-top: .5rem;
                    margin-bottom: 2rem;
                    i {
                    }
                    span {
                        margin: 0 .5rem;
                    }
                }
                .author {

                }
                .h-line {
                    color: #555;
                    border-bottom: .1rem solid #aaa;
                    cursor: pointer;
                    &:hover {
                        color: #222;
                        border-bottom: .1rem solid #222;
                    }
                    transition: all .15s ease-out;
                }
            }
            .content {
                line-height: 2;
                text-align: justify;
                font-size: 1.4rem;
                color: #555;
            }
            .read-all {
                margin-top: 2rem;
                text-align: left;
                span {
                    padding: 0;
                    font-size: 1.4rem;
                    color: #555;
                    border-bottom: .2rem solid #666;
                    display: inline-block;
                    cursor: pointer;
                    line-height: 2;
                }
            }
        }
        .empty {
            font-size: 1.5rem;
            color: #555;
        }
    }
</style>