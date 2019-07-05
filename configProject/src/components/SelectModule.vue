<template>
    <div>
        <a-button v-for="type in modules" :key="type" @click="$emit('selectConfig',type)">
            {{type}}
        </a-button>
    </div>
</template>

<script>
    export default {
        name: "SelectModule",
        props: {
            modules: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>