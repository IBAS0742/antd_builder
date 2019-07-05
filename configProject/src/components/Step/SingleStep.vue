<template>
    <a-form layout="horizontal">
        <component ref="comp" v-for="v in config" :key="v.key" :setting="v" :is="'My' + v.type.UpperFirstChat()"></component>
    </a-form>
    <!--<div>-->
        <!--<component v-for="v in config.config" :key="v.key" :setting="v" :is="'My' + v.type.UpperFirstChat()"></component>-->
    <!--</div>-->
</template>

<script>
    import FormItem from './../FormItem/index';

    // const example = {
    //     "permission": {
    //         "key": "permission",
    //         "value": true,
    //         "tip": "是否需要权限",
    //         "pic": "",
    //         "type": "switch"
    //     }
    // };

    export default {
        name: "SingleStep",
        components: {
            ...FormItem
        },
        data() {
            return {
                config: {}
            }
        },
        methods: {
            update() {
                let ret = {};
                this.$refs.comp.forEach(_ => {
                    ret[_.settingCP.key] = _.settingCP;
                });
                return ret;
            }
        },
        mounted() {
            // window.ss = window.ss ? window.ss.push(this) :[this];
        }
    }
</script>

<style scoped>

</style>