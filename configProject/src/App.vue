<template>
    <div id="app">
        <div v-show="!configType">
            <SelectModule :modules="configTypes" @selectConfig="selectConfig"></SelectModule>
        </div>
        <div v-show="configType">
            <!--<div style="position: absolute;z-index: 100;bottom: 20px;right: 20px;">-->
                <!--<a-button @click="buildOutput('outputVisible')" style="display: block;margin-bottom: 5px;">导出</a-button>-->
                <!--<a-button @click="buildOutput('inputVisible')" style="display: block;margin-bottom: 5px;">导入</a-button>-->
            <!--</div>-->
            <Step ref="step">
                <div slot="btns" style="display:inline-block;margin-left: 1em;">
                    <a-button style="margin-left: 0.5em;" @click="buildOutput('outputVisible')">导出</a-button>
                    <a-button style="margin-left: 0.5em;" @click="buildOutput('inputVisible')">导入</a-button>
                    <a-button style="margin-left: 0.5em;" @click="toolDraw.visible = true">工具</a-button>
                </div>
            </Step>
        </div>
        <a-drawer
                width="500px"
                @close="outputVisible = false"
                :closable="false"
                placement="right"
                :visible="outputVisible">
            <a-textarea :autosize="true" v-model="outputJson"/>
        </a-drawer>
        <a-drawer
                width="500px"
                @close="inputVisible = false"
                :closable="false"
                placement="right"
                :visible="inputVisible">
            <a-button @click="setInput()">提交</a-button>
            <a-textarea :autosize="true" v-model="inputJson"/>
        </a-drawer>
        <a-drawer
                title="工具"
                width=300
                :closable="false"
                @close="toolDraw.visible = false"
                :visible="toolDraw.visible">
            <Tools></Tools>
        </a-drawer>
    </div>
</template>

<script>
    import SelectModule from "./components/SelectModule";
    import Step from "./components/Step/Step";
    import Tools from "./components/Tool/Tools";
    const buildConfig = require('./buildConfig/index');

    export default {
        name: 'app',
        components: {Tools, Step, SelectModule},
        data() {
            return {
                current: 0,
                configTypes: (() => {
                    let cts = [];
                    for (let i in buildConfig) {
                        cts.push(i);
                    }
                    return cts;
                })(),
                configType: '',
                config: {},
                outputVisible: false,
                outputJson: '',
                inputVisible: false,
                inputJson: '',
                toolDraw: {
                    visible: false
                }
            }
        },
        methods: {
            selectConfig(config) {
                this.configType = config;
                this.config = buildConfig[config];
                this.$refs.step.steps = buildConfig[config].steps;
                this.$refs.step.stepList = buildConfig[config].stepList;
                this.$nextTick(this.$refs.step.initData)
            },
            buildOutput(tar) {
                let u = this.$refs.step.update();
                let obj = {};
                for (let i in u) {
                    if (i[0] === '_') {
                        obj[i] = u[i];
                    } else {
                        obj[i] = {};
                        for (let j in u[i]) {
                            obj[i][j] = u[i][j].value;
                        }
                    }
                }
                this.outputJson = JSON.stringify(obj,'','\t');
                this.inputJson = this.outputJson;
                this[tar] = true;
            },
            setInput() {
                this.$refs.step.setInput(JSON.parse(this.inputJson));
            }
        },
        mounted() {
            window.app = this;
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        padding: 10px;
    }
    .steps-content {
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        background-color: #fafafa;
        min-height: 200px;
        text-align: center;
        padding-top: 80px;
    }

    .steps-action {
        margin-top: 24px;
    }
</style>
