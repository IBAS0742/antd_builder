<template>
    <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="Tab 1" key="1">
            <div :id="id" class="AntTableColumnBuildTool"></div>
        </a-tab-pane>
        <a-tab-pane tab="Tab 2" key="2" forceRender>
            <a-button @click="() => { text = JSON.stringify(editor.getValue(),'','\t') }">获取 JSON</a-button>
            <a-button @click="editor.setValue(JSON.parse(text))">设置 JSON</a-button>
            <a-textarea :autosize="true" v-model="text" style="margin-top: 5px;"/>
        </a-tab-pane>
    </a-tabs>
</template>

<script>
    import JSONEditor from '@json-editor/json-editor/dist/jsoneditor.js'
    import { AntFormItemBuildSchema } from "./AntFormItemBuildTool";

    export default {
        name: "AntFormItemBuildTool",
        data() {
            return {
                id: 'editor' + (new Date).getTime(),
                editor: null,
                text: ''
            }
        },
        methods: {
            build() {
                let $this = this;
                this.editor = new JSONEditor(document.getElementById(this.id),{
                    schema: AntFormItemBuildSchema,
                    // Disable additional properties
                    no_additional_properties: true,
                    // Require all properties by default
                    required_by_default: true,
                    // 不需要折叠按钮
                    disable_collapse: true,
                    // 不需要编辑json
                    disable_edit_json: true,
                    // 不修改配置
                    disable_properties: true,
                    // 不需要在删除前问我
                    prompt_before_delete: false,
                    // 不要有删除最后一个内容的按钮
                    disable_array_delete_last_row: true,
                    // 自动拉伸输入框
                    expand_height: true,
                    // 将空属性值的内容删掉
                    remove_empty_properties: true
                });
                this.editor.on('change',function() {
                    // Get an array of errors from the validator
                    var errors = $this.editor.validate();

                    var indicator = document.getElementById('valid_indicator');

                    // Not valid
                    if(errors.length) {
                        indicator.style.color = 'red';
                        indicator.textContent = "not valid";
                    }
                    // Valid
                    else {
                        indicator.style.color = 'green';
                        indicator.textContent = "valid";
                    }
                });
                setInterval(this.beautify,1000);
            },
            beautify() {
                let btns = (document.getElementById(this.id) || { getElementsByTagName() { return [] } })
                    .getElementsByTagName('button');
                for (let i = 0;i < btns.length;i++) {
                    if (!btns[i].classList.contains('ant-btn')) {
                        btns[i].classList.add('ant-btn');
                    }
                }

            }
        },
        mounted() {
            setTimeout(this.build,500);
            window.$atcbt = this;
        }
    }
</script>

<style>
    /*.AntTableColumnBuildTool div {*/
        /*display: inline-block;*/
    /*}*/
    .form-control {
        margin-bottom: 5px;
    }
    .form-control label {
        display: inline-block !important;
    }
</style>