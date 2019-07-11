<template>
    <div>
        <a-form layout="horizontal">
            <component ref="comp" v-for="v in config" :key="v.key"
                       :setting="v" :is="'My' + v.type.UpperFirstChat()"></component>
        </a-form>
        <div v-if="preview.length">
            <a-button @click="previewSetting.visible = true;">预览</a-button>
            <a-drawer
                    title="预览"
                    placement="right"
                    width="90%"
                    @close="previewSetting.visible = false;"
                    :visible="previewSetting.visible">
                <component v-for="p in preview" :is="p.getComponentName(config)" v-bind="p.getProps(config)"
                           style="margin-bottom: 10px;border: 1px solid;padding: 5px;"/>
            </a-drawer>
        </div>
    </div>
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
        props: {
            preview: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                config: {},
                previewSetting: {
                    visible: false
                }
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
            window.ss = window.ss instanceof Array ? window.ss.push(this) :[this];
        }
    }
</script>

<style scoped>

</style>