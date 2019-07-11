<template>
    <a-icon
            style="font-size: 20px;transition: color .3s;
                    line-height: 64px;padding: 0 24px;cursor: pointer;"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="$emit('toggle')"
    />
</template>

<script>
    export default {
        name: "menuCollapsed",
        props: {
            collapsed: {
                required: true,
                type: Boolean
            }
        }
    }
</script>

<style scoped>

</style>