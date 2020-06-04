<template>
    <div id="app">
        <loginPanel></loginPanel>
    </div>
</template>

<script>
import loginPanel from "@/components/login/login.vue";

export default {
    name: "App",
    components: {
        loginPanel
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
    width: 100vw;
    height: 100vh;
    background: url("./assets/images/bg3.jpg") no-repeat;
    background-size: cover;
    background-position: center;

    font-family: "en-rect", "微软雅黑";
}
</style>
