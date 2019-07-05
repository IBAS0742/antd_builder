<template>
    <SingleStep ref="ss"></SingleStep>
</template>

<script>
    import SingleStep from "./SingleStep";
    export default {
        name: "SingleStepDep",
        components: {SingleStep},
        data() {
            return {
                defaultVal: '',
                config: {}
            }
        },
        methods: {
            setParam() {
                if (this.defaultVal) {
                    this.$refs.ss.config = this.config[this.defaultVal];
                }
            },
            update() {
                return this.$refs.ss.update();
            }
        },
        watch: {
            defaultVal() {
                this.setParam();
            }
        },
        mounted() {
            this.setParam();
        }
    }
</script>

<style scoped>

</style>