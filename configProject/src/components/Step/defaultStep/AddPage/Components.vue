<template>
    <div>
        <div style="margin-bottom: 0.5em;">
            <a-button @click="addComponents">添加组件</a-button>
        </div>
        <a-drawer
                :width="width"
                wrapClassName="previewDrawer"
                placement="left"
                :mask="false"
                style="overflow: hidden;"
                @close="previewSetting.visible = false"
                :visible="previewSetting.visible">
            <div slot="title">
                预览组件效果
                <a-button @click="$refs.preview[previewSetting.rebuildMethod]()"
                        v-show="previewSetting.rebuildMethod">刷新</a-button>
            </div>
            <component v-if="previewSetting.show"
                       ref="preview"
                    v-bind="previewSetting.comp.previewSetting.getProps(previewSetting.comp)"
                    :is="previewSetting.comp.previewSetting.getComponentName()"></component>
        </a-drawer>
        <a-collapse defaultActiveKey="1" v-show="components_bak.length">
            <a-collapse-panel v-for="(comp,ind) in components_bak"
                              :key="ind">
                <template slot="header">
                    {{comp.name}}
                    <a-button type="primary" icon="delete" @click.prevent.stop="removeComp(ind)">
                        删除
                    </a-button>
                    <a-button icon="fullscreen" style="margin-left: 5px;"
                              v-show="(comp.comp.havePreview ||(() => false)).bind(comp.comp)()"
                              @click.prevent.stop="preview(comp)">预览</a-button>
                </template>
                <div>
                    <span style="width: 65px;display: inline-block;height: 32px;line-height: 32px;">组件类型</span>
                    <a-select style="width: calc(100% - 65px);" v-model="comp.name" @change="changeComps(ind)">
                        <a-select-option v-for="opt in compsOptions" :key="opt.key" :value="opt.key">{{opt.label}}</a-select-option>
                    </a-select>
                    <component ref="c_comp" v-for="v in comp.comp.formItems || []"
                               :key="v.key" :setting="v" :is="'My' + v.type.UpperFirstChat()"></component>
                </div>
            </a-collapse-panel>
        </a-collapse>
    </div>
</template>

<script>
    import FormItem from './../../../FormItem/index';
    const comps = require('./../../../../buildConfig/components');

    window.comps = comps;

    export default {
        name: "Components",
        components: {
            ...FormItem
        },
        props: {
            components: {
                type: Array,
                required: true
            },
            width: {}
        },
        computed: {
            components_bak() {
                return this.components;
            }
        },
        data() {
            return {
                comps,
                compsOptions: ((comps) => {
                    let options = [];
                    for (let i in comps) {
                        options.push({
                            key: i,
                            label: comps[i].label || i
                        });
                    }
                    return options;
                })(comps),
                previewSetting: {
                    visible: false,
                    comp: null,
                    show: false,
                    rebuildMethod: false
                }
            }
        },
        methods: {
            addComponents() {
                this.components_bak.push({
                    name: '-- select one component --',
                    comp: {
                        formItems: []
                    }
                });
            },
            changeComps(ind) {
                this.components_bak[ind].comp = this.comps[this.components_bak[ind].name]();
                // this.components_bak[ind].formItems.splice(0,this.components_bak[ind].formItems.length,...this.comps[this.components_bak[ind].name].formItems);
            },
            removeComp(ind) {
                this.components_bak.splice(ind,1);
            },
            preview({ comp }) {
                console.log(comp);
                window.$comp = comp;
                this.previewSetting.comp = comp;
                this.previewSetting.show = comp.havePreview();
                this.previewSetting.visible = true;
                this.previewSetting.rebuildMethod = (comp.previewSetting || {}).rebuildMethod;
            }
        },
        mounted() {
            window.$cmps = this;
        }
    }
</script>

<style>
    .previewDrawer .ant-drawer-body{
        position: relative;
        width: 100%;
        height: calc(100% - 65px);
        padding: 0;
    }
</style>