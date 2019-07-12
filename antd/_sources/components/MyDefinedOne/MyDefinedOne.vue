<template>
    <div>
        {{msg}}
    </div>
</template>

<script>
    // 定义组件最好定义一个 name
    export default {
        name: "MyDefinedOne",
        props: {
            msg: {
                type: String,
                required: false,
                default() {
                    return "hi"
                }
            }
        }
    }
</script>

<style scoped>

</style>