<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>


<script>
export default {
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
    }
};
</script>


<style lang="scss">

@font-face {
    font-family: "en-rect";
    src: url("./assets/fonts/en-rect.woff2");
}

* { 
    padding: 0;
    margin: 0;
}

html {
    font-size: 62.5%;
}

img {
    display: block;
}

#app {
    font-family: "en-rect", 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
    ::selection {
        background: #262a30;
        color: #fff;
    }
}
</style>
