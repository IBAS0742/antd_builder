<template>
    <div>
        <component ref="ss" :is="(() => {
            if ('_addPage' === title) {
                return 'AddPage'
            }
        })()"></component>
    </div>
</template>

<script>
    import AddPage from "./defaultStep/AddPage/AddPage";
    export default {
        name: "defaultOP",
        props: {
            title: {}
        },
        components: {
            AddPage
        },
        data() {
            return {
                op: ''
            }
        },
        methods: {
            update() {
                return this.$refs.ss.update();
            },
            setParam(obj) {
                this.$refs.ss.setParam(obj);
            }
        }
    }
</script>

<style scoped>

</style>