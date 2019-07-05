<template>
    <div>
        登录页
        <a-button @click="login">登录</a-button>
    </div>
</template>

<script>
    import { ACCESS_TOKEN } from "../config/keyword";

    export default {
        name: "Login",
        methods: {
            login() {
                this.$ls.set(ACCESS_TOKEN,Math.random());
                this.$router.push({ name: 'dashboard' });
            }
        }
    }
</script>

<style scoped>

</style>