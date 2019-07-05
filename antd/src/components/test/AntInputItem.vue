<template>
    <a-form-item
            label="Note"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }">
        <a-input v-decorator="rule" @change="change"/>
    </a-form-item>
</template>

<script>
    /* eslint-disable vue/require-prop-type-constructor */

    export default {
        name: "AntInputItem",
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            value: '',
            rule: {
                type: Array,
                default() {
                    return [];
                }
            },
            form: {

            }
        },
        methods: {
            change(val) {
                this.$emit('change',val);
            }
        },
        mounted() {
            if (this.value) {
                this.form.set
            }
        }
    }
</script>

<style scoped>

</style>