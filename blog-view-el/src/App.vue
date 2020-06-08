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

#app {
    font-family: "en-rect", "微软雅黑";
}
</style>
