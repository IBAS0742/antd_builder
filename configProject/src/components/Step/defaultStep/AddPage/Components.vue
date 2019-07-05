<template>
    <div>
        <div style="margin-bottom: 0.5em;">
            <a-button @click="addComponents">添加组件</a-button>
        </div>
        <a-collapse defaultActiveKey="1" v-show="components_bak.length">
            <a-collapse-panel v-for="(comp,ind) in components_bak"
                              :key="ind">
                <template slot="header">
                    {{comp.name}}
                    <a-button type="primary" icon="delete" @click.prevent.stop="removeComp(ind)">
                        删除
                    </a-button>
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
            }
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
                })(comps)
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
            }
        },
        mounted() {
            window.$cmps = this;
        }
    }
</script>

<style scoped>

</style>