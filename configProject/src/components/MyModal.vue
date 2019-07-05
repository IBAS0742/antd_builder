<template>
    <a-modal
            :keyboard="false"
            :width="width"
            :closable="false"
            :visible="visible"
            title=""
            footer="">
        <slot></slot>
    </a-modal>
</template>

<script>
    export default {
        name: "MyModal",
        props: {
            visible: {},
            width: {
                default() {
                    return '380px'
                }
            }
        },
    }
</script>

<style scoped>

</style>