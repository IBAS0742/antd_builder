<template>
    <div>
        <div v-if="preview.length" style="margin: 5px 0;">
            <a-button @click="previewSetting.visible = true;">预览</a-button>
            <a-drawer
                    :mask="previewSetting.mask"
                    placement="right"
                    :width="previewSetting.width"
                    @close="previewSetting.visible = false;"
                    :visible="previewSetting.visible">
                <div slot="title">
                    预览
                    <a-button @click="fit(true)"
                              v-show="!previewSetting.fit">固定到一边</a-button>
                    <a-button @click="fit(false)"
                              v-show="previewSetting.fit">解除固定</a-button>
                </div>
                <component v-for="p in preview" :is="p.getComponentName(config,defaultVal)"
                           v-bind="p.getProps(config,defaultVal)"
                           style="margin-bottom: 10px;border: 1px solid;padding: 5px;"/>
            </a-drawer>
        </div>
        <a-form layout="horizontal" :style="previewSetting.style">
            <component ref="comp" v-for="v in config" :key="v.key"
                       :setting="v" :is="'My' + v.type.UpperFirstChat()"></component>
        </a-form>
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
            },
            defaultVal: {
                default: ''
            }
        },
        data() {
            return {
                config: {},
                previewSetting: {
                    mask: true,
                    visible: false,
                    fit: false,
                    width: '90%',
                    style: {
                    }
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
            },
            fit(statue) {
                this.previewSetting.fit = statue;
                if (statue) {
                    this.previewSetting.width = '50%';
                    this.previewSetting.style = {
                        width: '50%'
                    };
                    this.previewSetting.mask = false;
                } else {
                    this.previewSetting.width = '90%';
                    this.previewSetting.style = {
                        width: '100%'
                    };
                    this.previewSetting.mask = true;
                }
            }
        },
        mounted() {
        },
        watch: {
            'previewSetting.visible'(nval) {
                if (!nval) {
                    this.fit(false);
                }
            }
        }
    }
</script>

<style scoped>

</style>