<template>
    <div>
        <a-steps :current="current">
            <a-step v-for="sl in stepList" :key="sl" :title="sl.name">
            </a-step>
        </a-steps>
        <div class="steps-action">
            <a-button
                    v-if="current < stepList.length - 1"
                    type="primary" @click="next">
                下一步
            </a-button>
            <a-button v-if="current == stepList.length - 1"
                      type="primary"
                      @click="$message.success('Processing complete!')">
                完成
            </a-button>
            <a-button
                    v-if="current>0"
                    style="margin-left: 8px"
                    @click="prev">
                上一步
            </a-button>
            <slot name="btns"></slot>
        </div>
        <component v-for="(sl,ind) in stepList" :key="sl" :title="sl" :ref="sl"
                   :preview="steps[sl].previews || []"
                   v-show="current === ind"
                   :is="(() => {
                        if (steps[sl].name[0] === '_') {
                            return 'defaultOP'
                        } else {
                            // return steps[sl].multi ? 'table' : 'SingleStep';
                            return ('SingleStep' + (steps[sl].multi ? 'Dep' : ''))
                        }
                   })()"
        ></component>
    </div>
</template>

<script>

    import SingleStep from "./SingleStep";
    import SingleStepDep from "./SingleStepDep";
    import DefaultOP from "./defaultOP";
    export default {
        name: "Step",
        components: {DefaultOP, SingleStepDep, SingleStep},
        data() {
            return {
                steps: {},
                stepList: [],
                init: false,
                current: 0
            }
        },
        methods: {
            findDepAndSet() {
                if (this.init) {
                    for (let i in this.steps) {
                        if (this.steps[i].multi) {
                            let sp = this.steps[i].configsBaseOn.split('.');
                            this.$refs[i][0].defaultVal = this.steps[sp[0]].config[sp[1]].value;
                        }
                    }
                }
            },
            initData() {
                for (let i in this.steps) {
                    if (this.steps[i].name[0] === '_') {
                        this.$refs[i][0].op = this.steps[i].name.substring(1);
                    } else if (this.steps[i].multi) {
                        this.$refs[i][0].config = this.steps[i].configs;
                        let sp = this.steps[i].configsBaseOn.split('.');
                        this.$refs[i][0].defaultVal = this.steps[sp[0]].config[sp[1]].value;
                    } else {
                        this.$refs[i][0].config = this.steps[i].config;
                        // this.$refs[i][0].$set('config',this.steps[i].config);
                    }
                }
                this.init = true;
            },
            next() {
                this.current++
            },
            prev() {
                this.current--
            },
            update() {
                let config = {};
                let $this = this;
                this.stepList.forEach(ct => {
                    if (ct[0] === '_') {
                        config[ct] = $this.$refs[ct][0].update();
                    } else {
                        config[ct] = $this.$refs[ct][0].update();
                        if (this.steps[ct].multi) {
                            let sp = this.steps[ct].configsBaseOn.split('.');
                            this.steps[ct].configs[
                                this.steps[sp[0]].config[sp[1]].value
                                ] = $this.$refs[ct][0].update();
                        } else {
                            this.steps[ct].config = $this.$refs[ct][0].update();
                        }
                    }
                });
                return config;
            },
            setInput(obj) {
                let $this = this;
                this.stepList.forEach(ct => {
                    if (ct[0] === '_') {
                        $this.$refs[ct][0].setParam(obj[ct])
                    } else {
                        if ($this.steps[ct].multi) {
                            let sp = $this.steps[ct].configsBaseOn.split('.');
                            for (let j in $this.steps[ct].configs[
                                $this.steps[sp[0]].config[sp[1]].value
                                ]) {
                                $this.steps[ct].configs[
                                    $this.steps[sp[0]].config[sp[1]].value
                                    ][j].setValue(obj[ct][j]);
                            }
                            $this.$refs[ct][0].setParam()
                        } else {
                            for (let j in $this.steps[ct].config) {
                                $this.steps[ct].config[j].setValue(obj[ct][j]);
                            }
                        }
                    }
                });
            }
        },
        watch: {
            steps: {
                deep: true,
                handler() {
                    this.findDepAndSet();
                }
            }
        }
    }
</script>

<style scoped>

</style>